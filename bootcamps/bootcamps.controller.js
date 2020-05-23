const Schema = require("./bootcamp.model");

const asyncHandler = require("../utils/asyncHandler");
const { BadRequest } = require("../utils/errorResponses");
const { pipe } = require("../utils/fp-utils");
const queryParamsParser = require("../utils/queryParamsParser");
const queryParamsPaginator = require("../utils/queryParamsPaginator");

const BootcampBadRequest = (id) =>
  new BadRequest(`Bootcamp of ${id} not found`);

/**
 * @desc   Get all bootcamps
 * @route  GET /api/v1/bootcamps
 * @access Public
 */

const getBootcamps = asyncHandler(async (req, res) => {
  const { query } = req;
  const { baseQuery, selectBy, sortBy } = queryParamsParser(query);
  const totalPages = await Schema.countDocuments();
  const { pagination, skip, limit } = queryParamsPaginator(query, totalPages);

  const bootcamp = await Schema.find(baseQuery)
    .select(selectBy)
    .sort(sortBy)
    .skip(skip)
    .limit(limit);

  res.status(201).json({ success: true, data: bootcamp, pagination });
});

/**
 * @desc   Create a bootcamp
 * @route  POST /api/v1/bootcamps
 * @access Private
 */
const createBootcamp = asyncHandler(async (req, res) => {
  const newBootcamp = await Schema.create(req.body);
  res.status(201).json({ success: true, data: newBootcamp });
});

/**
 * @desc   Get a bootcamp
 * @route  GET /api/v1/bootcamps/:id
 * @access Public
 */
const getBootcamp = asyncHandler(async (req, res) => {
  const bootcamp = await Schema.findById(req.params.id);
  res.status(201).json({ success: true, data: bootcamp });
});

/**
 * @desc   Update a bootcamp
 * @route  PUT /api/v1/bootcamps/:id
 * @access Public
 */
async function updateBootcamp(req, res, next) {
  const { id } = req.params;
  const bootcamp = await Schema.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!bootcamp) return next(BootcampBadRequest(id));
  res.status(201).json({ success: true, data: bootcamp });
}

/**
 * @desc   Delete a bootcamp
 * @route  DELETE /api/v1/bootcamps/:id
 * @access Private
 */
async function deleteBootcamp(req, res, next) {
  const { id } = req.params;
  const bootcamp = await Schema.findByIdAndDelete(id);

  if (!bootcamp) return next(BootcampBadRequest(id));
  res.status(201).json({ success: true });
}

module.exports = {
  getBootcamps,
  createBootcamp,
  getBootcamp,
  updateBootcamp,
  deleteBootcamp,
};
