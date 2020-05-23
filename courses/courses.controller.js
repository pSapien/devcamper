const Schema = require("./course.model");

const asyncHandler = require("../utils/asyncHandler");
const { BadRequest } = require("../utils/errorResponses");

/**
 * @desc   Get all courses
 * @route  GET /api/v1/courses
 * @route  GET /api/v1/bootcamps/:bootcampId/courses
 * @access Public
 */

const getCourses = asyncHandler(async (req, res) => {
  const courses = await Schema.find();
  res.status(200).json({ data: courses, success: true });
});

module.exports = {
  getCourses,
};
