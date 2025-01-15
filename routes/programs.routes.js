const express = require("express");
const {
  addProgram,
  getAllPrograms,
} = require("../controllers/programs.controllers");

const router = express.Router();

router.post("/", addProgram);
router.get("/", getAllPrograms);

module.exports = router;
