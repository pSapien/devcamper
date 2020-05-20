const express = require('express');
const { getBootcamps, createBootcamp } = require('./bootcamps.controller');

const router = express.Router();

router
  .route('/')
  .get(getBootcamps)
  .post(createBootcamp);

module.exports = router;