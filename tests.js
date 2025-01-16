const multer = require("multer");
const xlsx = require("xlsx");
const Timetable = require("../models/timetable.model");

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

      if (timetableData.length < 3) return null;

      const day = timetableData[0][0] || sheetName;
      const timeSlots = timetableData[1].slice(1);

      return {
        day,
        schedules: timetableData
          .slice(2)
          .map((row) => ({
            program: row[0],
            content: timeSlots
              .map((time, index) => ({
                course: row[index + 1] || "",
                time,
              }))
              .filter((item) => item.course),
          }))
          .filter((item) => item.program),
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
        .json({ status: "failed", message: "Institution already exist" });
    }
    const extractedData = extractTimetableData(req.file.buffer);

    const timetable = new Timetable({
      extractedData,
      institution: institution?.toUpperCase(),
    });
    await timetable.save();

    res
      .status(200)
      .json({
        status: "success",
        message: "Timetable uploaded and processed successfully",
      });
  } catch (error) {
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

    console.log(id)

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
