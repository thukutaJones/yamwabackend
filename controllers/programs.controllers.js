const Program = require("../models/programs.model");

exports.addProgram = async (req, res) => {
  try {
    const { name, codes } = req.body;
    const existingProgram = await Program.findOne({
      name: name?.toUpperCase(),
    });
    if (existingProgram) {
      return res
        .status(400)
        .json({ status: "failed", message: "Program already exist" });
    }

    await Program.create({ name: name?.toUpperCase(), codes });
    res
      .status(201)
      .json({ status: "success", message: "Program created succussfully" });
  } catch (error) {
    res.status(500).json({ status: "failed", message: error.message });
  }
};

exports.getAllPrograms = async (req, res) => {
  try {
    const programs = await Program.find().sort({ name: 1});
    res.status(200).json({ status: "success", programs });
  } catch (error) {
    res.status(500).json({ status: "failed", message: error.message });
  }
};
