const express = require("express");
const passport =require("passport");
const{ loginController, registerController,DeleteController }= require("../controllers/userController");
const router = express.Router();
router.post("/login",loginController);
router.post("/register",registerController);
router.post("/delete-user",DeleteController)
module.exports=router;