const Schema = require("./bootcamp.model");

const asyncHandler = require("../utils/asyncHandler");
const { BadRequest } = require("../utils/errorResponses");
const { pipe } = require("../utils/fp-utils");

const BootcampBadRequest = (id) =>
  new BadRequest(`Bootcamp of ${id} not found`);

const OPERATORS_REGEX = /\b(eq|gt|gte|lt|lte)\b/g;
const parseComparisonQueryOperatorsIfAny = (query) =>
  JSON.parse(
    JSON.stringify(query).replace(OPERATORS_REGEX, (match) => `$${match}`)
  );

const extractFields = (query) => (key) =>
  query[key] ? query[key].split(",").join(" ") : null;

const removeFields = (fields) => (query) => {
  const q = { ...query };
  fields.forEach((field) => {
    if (q[field]) delete q[field];
  });
  return q;
};

const getPaginationData = async (query, Schema) => {
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 1;
  const startIdx = (page - 1) * limit;
  const endIdx = page * limit;
  const total = await Schema.countDocuments();

  let pagination = {};
  if (endIdx < total) pagination.next = { page: page + 1, limit };
  if (startIdx > 0) pagination.prev = { page: page - 1, limit };

  return {
    pagination,
    skip: startIdx,
    limit,
  };
};

/**
 * @desc   Get all bootcamps
 * @route  GET /api/v1/bootcamps
 * @access Public
 */

const getBootcamps = asyncHandler(async (req, res) => {
  const { query } = req;
  const extractQueryFieldsOrNull = extractFields(query);
  const { pagination, skip, limit } = await getPaginationData(query, Schema);

  const bootcamp = await Schema.find(
    pipe(
      parseComparisonQueryOperatorsIfAny,
      removeFields(["select", "sort", "limit", "page"])
    )(query)
  )
    .select(extractQueryFieldsOrNull("select"))
    .sort(extractQueryFieldsOrNull("sort"))
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
