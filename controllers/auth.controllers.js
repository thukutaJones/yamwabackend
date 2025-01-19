const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

const createSendToken = async (user, statusCode, res) => {
  const token = jwt.sign(
    { userId: user._id, email: user.email },
    process.env.JWT_SECRET
  );

  res.status(statusCode).json({
    status: "success",
    token,
    user
  });
};

exports.signUp = async (req, res) => {
  try {
    const { email, userName } = req.body;
    const existingEmail = await User.findOne({ email: email });
    if (existingEmail) {
      return res
        .status(400)
        .json({ status: "failed", message: "Email already exists" });
    }
    const existingUserName = await User.findOne({ userName: userName });
    if (existingUserName) {
      return res
        .status(400)
        .json({ status: "failed", message: "userName already exists" });
    }

    const user = await User.create(req.body);
    await createSendToken(user, 201, res);
  } catch (error) {
    res.status(200).json({ status: "failed", message: error.message });
  }
};

exports.signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        status: "failed",
        message: "email and password required to login",
      });
    }

    const checkUser = await User.findOne({ email }).select("+password");
    if (
      !checkUser ||
      !(await checkUser.correctPassword(password, checkUser.password))
    ) {
      return res.status(401).json({
        status: "failed",
        message: "incorrect credentials",
      });
    }
    await createSendToken(checkUser, 200, res);
  } catch (error) {
    res.status(200).json({ status: "failed", message: error.message });
  }
};
