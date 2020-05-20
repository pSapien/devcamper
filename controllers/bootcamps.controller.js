/**
 * @desc   Get all bootcamps
 * @route  GET /api/v1/bootcamps
 * @access Public
 */
 function getBootcamps(req, res, next) {
  res.send('Hello World');
 }

 /**
  * @desc   Create a bootcamp
  * @route  POST /api/v1/bootcamps
  * @access Private
  */
 function createBootcamp() {

 }

 module.exports = {
   getBootcamps,
   createBootcamp,
 }