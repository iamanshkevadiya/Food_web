const { Router } = require("express");
const { decode } = require("../middleware/decode");
const { isSuperAdmin } = require("../middleware/isAdmin");
const { createRestaurant, getRestaurants, updateRestaurant, deleteRestaurant, assignAdmin } = require("../controller/restaurantController");

const ResRouter = Router();

ResRouter.post("/", decode, isSuperAdmin, createRestaurant);
ResRouter.get("/", decode, getRestaurants);
ResRouter.put("/:id", decode, isSuperAdmin, updateRestaurant);
ResRouter.delete("/:id", decode, isSuperAdmin, deleteRestaurant);
ResRouter.post("/:id/admin", decode, isSuperAdmin, assignAdmin);

module.exports = { ResRouter };