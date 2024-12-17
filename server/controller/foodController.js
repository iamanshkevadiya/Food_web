const Food = require("../models/Food.model");

const addFood = async (req, res) => {
    try {
        const { name, price, description } = req.body;

        const newFood = new Food({
            name,
            price,
            description,
            restaurantId: req.params.restaurantId,
            createdBy: req.user.id,
        });

        await newFood.save();
        res.status(201).send(newFood);
    } catch (err) {
        res.status(500).send({ message: "Server Error", error: err.message });
    }
};

const getFoods = async (req, res) => {
    try {
        const foods = await Food.find({ restaurantId: req.params.restaurantId });
        res.send(foods);
    } catch (err) {
        res.status(500).send({ message: "Server Error", error: err.message });
    }
};

const updateFood = async (req, res) => {
    try {
        const { name, price, description } = req.body;

        const food = await Food.findByIdAndUpdate(
            req.params.id,
            { name, price, description },
            { new: true }
        );

        res.send(food);
    } catch (err) {
        res.status(500).send({ message: "Server Error", error: err.message });
    }
};

const deleteFood = async (req, res) => {
    try {
        await Food.findByIdAndDelete(req.params.id);
        res.send({ message: "Food item deleted successfully" });
    } catch (err) {
        res.status(500).send({ message: "Server Error", error: err.message });
    }
};
module.exports = { addFood, getFoods, updateFood, deleteFood };