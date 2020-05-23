function queryParamsPaginator(query, totalPages) {
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 1;
  const startIdx = (page - 1) * limit;
  const endIdx = page * limit;

  let pagination = {};
  if (endIdx < totalPages) pagination.next = { page: page + 1, limit };
  if (startIdx > 0) pagination.prev = { page: page - 1, limit };

  return {
    pagination,
    skip: startIdx,
    limit,
  };
}

module.exports = queryParamsPaginator;
