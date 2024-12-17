const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const Signup = async (req, res) => {
    let { email, password } = req.body;
    try {
        let user = await User.findOne({ email: email });
        if (user) {
            return res.status(403).send({ msg: "user already exists" });
        } else {
            let hash = await bcrypt.hash(password, 10);
            req.body.password = hash;
            user = await User.create(req.body);
            let data = {
                email: user.email,
                id: user.id,
                role: user.role,
                username: user.username,
            };
            let token = await jwt.sign(data, "private-key");
            console.log(token);
            return res.status(201).send({
                msg: "user created",
                token: token,
            });
        }
    } catch (error) {
        res.status(500).send({ msg: "err", error: error.message });
    }
};

const Login = async (req, res) => {
    let { email, password } = req.body;
    let user = await User.findOne({ email });
    if (!user) {
        return res.status(404).send({ msg: "user not found" });
    }
    let isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(404).send({ msg: "invalid password " });
    }
    let data = {
        email: user.email,
        id: user.id,
        role: user.role,
        username: user.username,
    };
    let token = await jwt.sign(data, "private-key");
    return res.status(200).send({ msg: "user loggedIn", token: token });
};

const GetUserByid = async (req, res) => {
    try {
        let { userId } = req.params;
        let data = await User.findById(userId);
        res.send(data);
    } catch (error) {
        res.send({ message: error });
    }
};

const deleteUser = async (req, res) => {
    let { id } = req.params;
    try {
        let user = await User.findByIdAndDelete(id);
        res.status(200).send({ msg: "user deleted", user });
    } catch (error) {
        console.log(error.message);
        res.status(404).send({ msg: "error deleting user", error });
    }
};

const getAdmins = async (req, res) => {
    try {
        let data = await User.find({ role: "ADMIN" });
        res.status(202).send(data);
        console.log(data);
    } catch (error) {
        res.status(404).send({ err: error.message });
    }
};
const verifyadmin = async (req, res) => {
    let { adminId } = req.params;
    try {
        let user = await User.findByIdAndUpdate(
            adminId,
            { role: "ADMIN" },
            { new: true }
        );
        res.status(200).send({ msg: "user role updated", user });
    } catch (error) {
        console.log(error.message);
        res.status(404).send({ msg: "error updating user role", error });
    }
};

module.exports = {
    Signup,
    Login,
    GetUserByid,
    deleteUser,
    getAdmins,
    verifyadmin,
 };
