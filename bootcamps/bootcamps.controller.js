const Schema = require('./bootcamp.model');

/**
 * @desc   Get all bootcamps
 * @route  GET /api/v1/bootcamps
 * @access Public
 */
function getBootcamps(req, res) {
  res.send('Hello World');
}

/**
 * @desc   Create a bootcamp
 * @route  POST /api/v1/bootcamps
 * @access Private
 */
async function createBootcamp(req, res) {
  try {
    const newBootcamp = await Schema.create(req.body);
    res.status(201).json({ success: true, data: newBootcamp });
  } catch(err) {
    res.status(400).json({ success: false });
  }
}

module.exports = {
  getBootcamps,
  createBootcamp,
}