const multer = require("multer");
const xlsx = require("xlsx");
const Timetable = require("../models/timetable.model");
const Classes = require("../models/classes.model");

const storage = multer.memoryStorage();

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const fileTypes = /xlsx|xls/;
    const mimeTypes = [
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "application/vnd.ms-excel",
    ];
    const extName = fileTypes.test(file.originalname.toLowerCase());
    const mimeType = mimeTypes.includes(file.mimetype);

    if (mimeType && extName) {
      cb(null, true);
    } else {
      cb(new Error("Only .xls and .xlsx files are allowed!"));
    }
  },
});
exports.uploadFile = upload.single("timetable");
const extractTimetableData = (fileBuffer) => {
  const workbook = xlsx.read(fileBuffer, { type: "buffer" });
  const sheetNames = workbook.SheetNames;

  return sheetNames
    .map((sheetName) => {
      const sheet = workbook.Sheets[sheetName];
      const timetableData = xlsx.utils.sheet_to_json(sheet, { header: 1 });

      if (timetableData.length < 2) return null;

      const day = timetableData[0][0] || sheetName;
      const timeSlots = timetableData[1].slice(1);

      return {
        day,
        schedules: timetableData
          .slice(2)
          .map((row, rowIndex) => {
            const program = row[0];
            if (!program) return null;

            const content = [];
            let currentCourse = null;
            let currentLocation = null;
            let startTime = null;

            for (let colIndex = 0; colIndex < timeSlots.length; colIndex++) {
              const time = timeSlots[colIndex];
              const course = row[colIndex + 1]?.trim() || "";
              const locationRow = timetableData[rowIndex + 3] || [];
              const location = locationRow[colIndex + 1]?.trim() || "";

              if (
                currentCourse === course &&
                currentLocation === location &&
                course
              ) {
                // Extend the end time for consecutive slots of the same course
                const endTime = timeSlots[colIndex + 1] || time;
                content[content.length - 1].time = `${startTime}-${endTime}`;
              } else if (course) {
                startTime = time;
                const endTime = timeSlots[colIndex + 1] || time;

                content.push({
                  course,
                  location,
                  time: `${startTime}-${endTime}`,
                });

                currentCourse = course;
                currentLocation = location;
              } else {
                currentCourse = null;
                currentLocation = null;
              }
            }

            if (currentCourse) {
              const endTime = timeSlots[timeSlots.length] || "6:45PM";
              content[content.length - 1].time = `${startTime}-${endTime}`;
            }

            return { program, content };
          })
          .filter((item) => item),
      };
    })
    .filter((sheet) => sheet);
};

exports.uploadTimetable = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  try {
    const { institution } = req.body;
    const existingInstitution = await Timetable.findOne({
      institution: institution?.toUpperCase(),
    });
    if (existingInstitution) {
      return res
        .status(400)
        .json({ status: "failed", message: "Institution already exists" });
    }

    const extractedData = extractTimetableData(req.file.buffer);

    const timetable = new Timetable({
      extractedData,
      institution: institution?.toUpperCase(),
    });
    await timetable.save();

    res.status(200).json({
      status: "success",
      message: "Timetable uploaded and processed successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "failed", message: error.message });
  }
};

exports.getTimetableData = async (req, res) => {
  try {
    const timetables = await Timetable.find();

    if (timetables.length === 0) {
      return res.status(404).json({ message: "No timetables found" });
    }

    res.status(200).json(timetables.map(({ extractedData }) => extractedData));
  } catch (error) {
    res.status(500).json({ status: "failed", message: error.message });
  }
};

exports.getAvailableTimeTables = async (req, res) => {
  try {
    const availableTimetables = await Timetable.find().select("-extractedData");
    res.status(200).json({ status: "success", availableTimetables });
  } catch (error) {
    res.status(500).json({ status: "failed", message: error.message });
  }
};

exports.deleteTimeTable = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedTimeTable = await Timetable.findByIdAndDelete(id);

    if (!deletedTimeTable) {
      return res
        .status(404)
        .send({ status: "failed", message: "Timetable not found" });
    }

    res
      .status(200)
      .send({ status: "success", message: "Timetable deleted successfully" });
  } catch (error) {
    res.status(500).json({ status: "failed", message: error.message });
  }
};

exports.createClassSchedules = async (req, res) => {
  try {
    const timetables = await Timetable.find();
    let schedules =
      timetables[0]?.extractedData[new Date().getDay()]?.schedules;

    const data = schedules.map((program) => ({
      ...program,
      content: program.content.map((course) => ({
        ...course,
        status: "pending",
        attendees: [],
        absentees: [],
      })),
    }));

    for (const schedule of schedules) {
      await Classes.create(schedule);
    }
    res
      .status(200)
      .json({ status: "success", message: "Schedules created successfully" });
  } catch (error) {
    res.status(500).json({ status: "failed", message: error.message });
  }
};

exports.getProgramSchedule = async (req, res) => {
  try {
    const { programCode } = req.body;
    // const schedule = await Classes.findOne({ program: programCode });
    const timetables = await Timetable.find();
    const day = { 0: 6, 1: 0, 2: 1, 3: 2, 4: 3, 5: 4, 6: 5 };
    let schedules =
      timetables[0]?.extractedData[day[new Date().getDay()]]?.schedules;
    // if (!schedule) {
    //   return res.status(404).json({
    //     status: 404,
    //     message: `Schedule for ${programCode} not found`,
    //   });
    // }
    const schedule = schedules.find(
      (schedule) => schedule.program === programCode
    );
    res.status(200).json({ status: "success", schedule });
  } catch (error) {
    res.status(500).json({ status: "failed", message: error.message });
  }
};
