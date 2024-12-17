const { Router } = require("express");
const { decode } = require("../middleware/decode");
const { isSuperAdmin } = require("../middleware/isAdmin");
const { addFood, getFoods, updateFood, deleteFood } = require("../controller/foodController");

const foodRouter = Router();

foodRouter.post("/", decode, isSuperAdmin, addFood);
foodRouter.get("/", decode, getFoods);
foodRouter.patch("/:id", decode, isSuperAdmin, updateFood);
foodRouter.delete("/:id", decode, isSuperAdmin, deleteFood);

module.exports = { foodRouter };
