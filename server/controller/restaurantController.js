const Restaurant = require("../models/Restaurant.module");
const User = require("../models/user.model");

const createRestaurant = async (req, res) => {
    try {
        const { name, location } = req.body;

        const newRestaurant = new Restaurant({
            name,
            location,
            createdBy: req.user.id,
        });

        await newRestaurant.create();
        res.status(201).send(newRestaurant);
    } catch (err) {
        res.status(500).send({ message: "Server Error", error: err.message });
    }
};

const getRestaurants = async (req, res) => {
    try {
        const restaurants = await Restaurant.find();
        res.send(restaurants);
    } catch (err) {
        res.status(500).send({ message: "Server Error", error: err.message });
    }
};

const updateRestaurant = async (req, res) => {
    try {
        const { name, location } = req.body;

        const restaurant = await Restaurant.findByIdAndUpdate(
            req.params.id,
            { name, location },
            { new: true }
        );

        res.send(restaurant);
    } catch (err) {
        res.status(500).send({ message: "Server Error", error: err.message });
    }
};

const deleteRestaurant = async (req, res) => {
    try {
        await Restaurant.findByIdAndDelete(req.params.id);
        res.send({ message: "Restaurant deleted successfully" });
    } catch (err) {
        res.status(500).send({ message: "Server Error", error: err.message });
    }
};

const assignAdmin = async (req, res) => {
    try {
        const { adminId } = req.body;

        const restaurant = await Restaurant.findById(req.params.id);
        if (!restaurant)
            return res.send({ message: "Restaurant not found" });

        const user = await User.findById(adminId);
        if (!user) return res.status(404).send({ message: "Admin not found" });

        user.role = "admin";
        user.restaurantId = restaurant._id;
        await user.save();

        restaurant.admins.push(user._id);
        await restaurant.save();

        res.send({ message: "Admin assigned successfully" });
    } catch (err) {
        res.status(500).send({ message: "Server Error", error: err.message });
    }
};
module.exports = { createRestaurant, updateRestaurant, deleteRestaurant, createRestaurant, assignAdmin, getRestaurants }