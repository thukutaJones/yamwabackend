const mongoose = require("mongoose");

const ClassesSchema = mongoose.Schema(
  {
    program: {
      type: String,
      required: [true, "Program is required"],
      unique: true,
    },
    content: [
      {
        course: {
          type: String,
          required: [true, "Course is required"],
        },
        location: {
          type: String,
          required: [true, "Location is required"],
        },
        status: {
          type: String,
          required: [true, "Status is required"],
          default: "pending",
        },
        attendees: [
          { student: { type: mongoose.Schema.Types.ObjectId, ref: "User" } },
        ],
        time: {
          type: String,
        },
        absentees: [
          {
            student: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
            reason: {
              type: String,
            },
          },
        ],
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Classes", ClassesSchema);
