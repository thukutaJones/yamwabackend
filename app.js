const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const mongosanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
require("dotenv").config();
const bodyParser = require("body-parser");

const programRoutes = require("./routes/programs.routes");
const authRoutes = require("./routes/auth.routes");
const timeTableRoutes = require("./routes/timetable.routes");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
app.use(mongosanitize());
app.use(helmet());
app.use(xss());

app.use("/api/program", programRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/timetable", timeTableRoutes);

module.exports = app;
