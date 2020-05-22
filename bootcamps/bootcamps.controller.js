const Schema = require("./bootcamp.model");

const asyncHandler = require("../utils/asyncHandler");
const { BadRequest } = require("../utils/errorResponses");

const BootcampBadRequest = (id) =>
  new BadRequest(`Bootcamp of ${id} not found`);

function parseComparisonQueryOperatorsIfAny(query) {
  const QUERY_OPERATORS_KEYS = ["eq", "gt", "gte", "lt", "lte"];
  const parsedQuery = { ...query };

  Object.keys(query).forEach((param) => {
    const maybeComparsionQuery = query[param];
    const maybeQueryOperatorKey =
      typeof query[param] === "object" && Object.keys(maybeComparsionQuery)[0];

    if (QUERY_OPERATORS_KEYS.includes(maybeQueryOperatorKey)) {
      const quantity = maybeComparsionQuery[maybeQueryOperatorKey];
      const newMongooseOperatorKey = `$${maybeQueryOperatorKey}`;

      parsedQuery[param] = { [newMongooseOperatorKey]: quantity };
    }
  });

  return parsedQuery;
}

/**
 * @desc   Get all bootcamps
 * @route  GET /api/v1/bootcamps
 * @access Public
 */

const getBootcamps = asyncHandler(async (req, res, next) => {
  const parsedQuery = parseComparisonQueryOperatorsIfAny(req.query);
  const bootcamp = await Schema.find(parsedQuery);
  res.status(201).json({ success: true, data: bootcamp });
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
