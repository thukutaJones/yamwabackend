const mongoose = require("mongoose");

const ProgramsSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: [true, "Program already exist"],
    },
    codes: [
      {
        name: {
          type: String,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Program", ProgramsSchema);
