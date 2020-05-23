const { pipe } = require("./fp-utils");

const extractFieldsOrNull = (query, key) =>
  query[key] ? query[key].split(",").join(" ") : null;

const OPERATORS_REGEX = /\b(eq|gt|gte|lt|lte)\b/g;
const parseComparisonQueryOperatorsIfAny = (query) =>
  JSON.parse(
    JSON.stringify(query).replace(OPERATORS_REGEX, (match) => `$${match}`)
  );

const removeFields = (fields) => (query) => {
  const q = { ...query };
  fields.forEach((field) => {
    if (q[field]) delete q[field];
  });
  return q;
};

function queryParamsParser(queryParams) {
  const baseQuery = pipe(
    parseComparisonQueryOperatorsIfAny,
    removeFields(["select", "sort", "limit", "page"])
  )(queryParams);

  return {
    baseQuery,
    selectBy: extractFieldsOrNull(queryParams, "select"),
    sortBy: extractFieldsOrNull(queryParams, "sort"),
  };
}

module.exports = queryParamsParser;
