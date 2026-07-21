export default function (objectPagination, query,countRecords) {
  if (query.page) {
    objectPagination.page = query.page;
  }
  if (query.limit) {
    objectPagination.limit = query.limit;
  }
  objectPagination.skip = (objectPagination.page - 1) * objectPagination.limit;
  objectPagination.totalPage = Math.ceil(countRecords / objectPagination.limit);
  return objectPagination;
}