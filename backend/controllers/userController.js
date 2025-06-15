const userModel = require("../models/userModel");
const loginController = async (req, res, next) => {
  const { email, password } = req.body;

  userModel.authenticate()(email, password, (err, user, options) => {
    if (err) return res.status(500).json({ message: err.message });

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    req.login(user, (err) => {
      if (err) return res.status(500).json({ message: err.message });
      res.status(200).json({ message: "Login successful", user });
    });
  });
};
const registerController = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const user = new userModel({ name, email });
    const registeredUser = await userModel.register(user, password);
    res.status(201).json({ message: "User registered successfully", user: registeredUser });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const DeleteController = async (req, res) => {
  try {
    const { id } = req.body;
    const deletedUser = await userModel.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User Deleted Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports ={loginController,registerController,DeleteController}