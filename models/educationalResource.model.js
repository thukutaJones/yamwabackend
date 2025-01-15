const mongoose = require("mongoose");

const EducationalResourceSchema = mongoose.Schema({
  topic: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Program",
  },
  links: [
    {
      name: {
        type: String,
        required: [true, "Please provide the name of the resource"],
      },
      link: {
        type: String,
        required: [true, "Please provide the link of the resource"],
      },
    },
  ],
});

module.exports = mongoose.model(
  "EducationalResource",
  EducationalResourceSchema
);
