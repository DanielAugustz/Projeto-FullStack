const express = require("express")
const router = express.Router();
const carController = require("../controllers/carController")

//Get
router.get("/cars", carController.listCars)

//git by id
router.get("/cars/:id", carController.getCar)