const fs = require("fs");

require("dotenv").config({ path: "./config.env" });

const Bootcamp = require("./bootcamps/bootcamp.model");
const Course = require("./courses/course.model");

const bootcampJson = require("./_data/bootcamps.json");
const courseJson = require("./_data/courses.json");

const connectDb = require("./db.config");
connectDb();

async function populateData() {
  try {
    await Bootcamp.create(bootcampJson);
    await Course.create(courseJson);
    console.log("Data has been imported....");
    process.exit();
  } catch (err) {
    console.error(err);
  }
}

async function dropDb() {
  try {
    await Bootcamp.deleteMany();
    await Course.deleteMany();
    console.log("Data has been deleted....");
    process.exit();
  } catch (err) {
    console.log(err);
  }
}

if (process.argv[2] === "-i") populateData();
if (process.argv[2] === "-d") dropDb();
