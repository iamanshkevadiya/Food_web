const { default: mongoose } = require("mongoose");

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    role: { type: String, enum: ['superadmin', 'admin', 'user'], default: 'user' },
    restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant', default: null },
});

const User = mongoose.Model('User', userSchema);
module.exports = User;  