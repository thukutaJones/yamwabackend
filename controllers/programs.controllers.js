const Program = require("../models/programs.model");

exports.addProgram = async (req, res) => {
  try {
    const { name } = req.body;
    const existingProgram = await Program.findOne({
      name: name?.toUpperCase(),
    });
    if (existingProgram) {
      return res
        .status(400)
        .json({ status: "failed", message: "Program already exist" });
    }

    await Program.create({ name: name?.toUpperCase() });
    res
      .status(201)
      .json({ status: "success", message: "Program created succussfully" });
  } catch (error) {
    res.status(500).json({ status: "failed", message: error.message });
  }
};

exports.getAllPrograms = async (req, res) => {
  try {
    const programs = await Program.find();
    res.status(200).json({ status: "success", programs });
  } catch (error) {
    res.status(500).json({ status: "failed", message: error.message });
  }
};
