const Schema = require('./bootcamp.model');

/**
 * @desc   Get all bootcamps
 * @route  GET /api/v1/bootcamps
 * @access Public
 */
async function getBootcamps(req, res) {
  try {
    const bootcamps = await Schema.find();
    return res.status(201).json({ success: true, data: bootcamps });
  } catch (err) {
    res.status(400).json({ success: false });
  }
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
  } catch (err) {
    res.status(400).json({ success: false });
  }
}

/**
 * @desc   Get a bootcamp
 * @route  GET /api/v1/bootcamps/:id
 * @access Public
 */
async function getBootcamp(req, res) {
  try {
    const bootcamp = await Schema.findById(req.params.id);
    res.status(201).json({ success: true, data: bootcamp });
  } catch (err) {
    res.status(400).json({ success: false });
  }
}

/**
 * @desc   Update a bootcamp
 * @route  PUT /api/v1/bootcamps/:id
 * @access Public
 */
async function updateBootcamp(req, res) {
  try {
    const bootcamp = await Schema.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!bootcamp) return res.status(400).json({ success: false });
    res.status(201).json({ success: true, data: bootcamp });
  } catch (err) {
    res.status(400).json({ success: false });
  }
}

/**
 * @desc   Delete a bootcamp
 * @route  DELETE /api/v1/bootcamps/:id
 * @access Private
 */
async function deleteBootcamp(req, res) {
  try {
    const bootcamp = await Schema.findByIdAndDelete(req.params.id);

    if(!bootcamp) return res.status(400).json({ success: false });
    res.status(201).json({ success: true });
  } catch (err) {
    res.status(400).json({ success: false });
  }
}


module.exports = {
  getBootcamps,
  createBootcamp,
  getBootcamp,
  updateBootcamp,
  deleteBootcamp,
}