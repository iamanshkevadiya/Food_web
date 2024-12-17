const { default: mongoose } = require("mongoose");

const OrderSchema = new mongoose.Schema({
    userId: ObjectId,
    restaurantId: ObjectId,
    foodItems: [{ foodId: ObjectId, quantity: Number }],
    totalAmount: Number,
    status: { type: String, enum: ["pending", "completed"], default: "pending" },
});

const Order = mongoose.model("Order", OrderSchema);
module.exports = Order;