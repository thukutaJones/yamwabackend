const mongoose = require("mongoose");

const TimetableSchema = mongoose.Schema(
  {
    institution: {
      type: String,
      required: [true, "Please provide the institution"],
      unique: true,
    },
    extractedData: { type: Object, default: {} },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Timetable", TimetableSchema);
