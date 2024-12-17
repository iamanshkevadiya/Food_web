const { default: mongoose } = require("mongoose");

const FoodSchema = new mongoose.Schema({
    name: { type: String, },
    price: { type: Number },
    description: { type: String },
    restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: "Restaurant" },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const Food = mongoose.model("Food", FoodSchema);
module.exports = Food;