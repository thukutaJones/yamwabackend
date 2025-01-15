const express = require("express");
const {
  uploadFile,
  uploadTimetable,
  getTimetableData,
  deleteTimeTable,
  getAvailableTimeTables,
} = require("../controllers/timetable.controller");

const router = express.Router();

router.post("/", uploadFile, uploadTimetable);
router.get("/content", getTimetableData);
router.get("/", getAvailableTimeTables);
router.delete("/:id", deleteTimeTable);

module.exports = router;
