const { default: mongoose } = require("mongoose");

const RestaurantSchema = new mongoose.Schema({
    name: { type: String },
    location: { type: String },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    admins: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

const Restaurant = mongoose.model('Restaurant', RestaurantSchema);
module.exports = Restaurant;