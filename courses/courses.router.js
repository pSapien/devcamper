const model = require("./courses.controller");

const express = require("express");
const router = express.Router();

router
  .route("/")
  .get(model.getCourses);

module.exports = router;
