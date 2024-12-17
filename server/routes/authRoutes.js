const { Router } = require("express");
const { GetUserByid, Signup, Login, deleteUser, getAdmins, verifyadmin } = require("../controller/authController");
const { decode } = require("../middleware/decode");
const { isSuperAdmin } = require("../middleware/isAdmin");

const userRouter = Router();

userRouter.get("/:userid", GetUserByid);
userRouter.post("/signup", Signup);
userRouter.post("/login", Login);
userRouter.delete("/delete/:id", decode, isSuperAdmin, deleteUser);
userRouter.get("/all-admin", decode, isSuperAdmin, getAdmins);
userRouter.patch("/admin-update/:id", decode, isSuperAdmin, verifyadmin);

module.exports = { userRouter };