const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: [true, "User name can not be empty"],
    },
    email: {
      type: String,
      unique: [true, "Please provide your email"],
      lowercase: true,
      validate: {
        validator: validator.isEmail,
        message: "invalid email",
      },
      required: true,
    },
    password: {
      type: String,
      select: false,
      required: [true, "Please provide your password"],
    },
    role: {
      type: String,
      required: [true, "Please provide the role of the user"],
    },
    program: {
      type: String,
      required: function () {
        return this.role === "student";
      },
    },
    profilePhoto: {
      type: String,
      default:
        "https://storage.googleapis.com/moth-cv/profile-pictures/anonymous-avatar-icon-25.webp",
    },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);
  this.confirm = undefined;
  next();
});
UserSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model("User", UserSchema);
module.exports = User;
