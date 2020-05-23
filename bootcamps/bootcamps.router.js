const express = require("express");
const router = express.Router();

const model = require("./bootcamps.controller");

router
  .route("/")
  .get(model.getBootcamps)
  .post(model.createBootcamp);

router
  .route("/:id")
  .get(model.getBootcamp)
  .put(model.updateBootcamp)
  .delete(model.deleteBootcamp);

module.exports = router;
