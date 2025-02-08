const express = require("express");
const { getUserData, getAllUsers } = require("../controllers/user.controller");

const router = express.Router();

router.get("/:id", getUserData);
router.get("/", getAllUsers);

module.exports = router;
