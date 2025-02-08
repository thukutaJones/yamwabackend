const User = require("../models/user.model");

exports.getUserData = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json({ status: "success", user });
  } catch (error) {
    res.status(500).json({ status: "failed", message: error.message });
  }
};

exports.getAllUsers = async (req, res) => { 
  try {
    const users = await User.find();
    res.status(200).json({ status: "success", users });
  } catch (error) {
    res.status(500).json({ status: "failed", message: error.message });
  }
}