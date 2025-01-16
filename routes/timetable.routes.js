const express = require("express");
const {
  uploadFile,
  uploadTimetable,
  getTimetableData,
  deleteTimeTable,
  getAvailableTimeTables,
  createClassSchedules,
  getProgramSchedule
} = require("../controllers/timetable.controller");

const router = express.Router();

router.post("/", uploadFile, uploadTimetable);
router.get("/content", getTimetableData);
router.get("/", getAvailableTimeTables);
router.delete("/:id", deleteTimeTable);
router.post("/schedules", createClassSchedules);
router.post("/schedules/program", getProgramSchedule);


module.exports = router;
