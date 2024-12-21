import {
  DefaultOptions,
  FilterFields,
  ListQueryResult,
  QueryParams,
  SearchFields,
} from "@interfaces";
import { Op, Sequelize } from "sequelize";

function getSearchQuery(
  searchFields: SearchFields,
  searchString: string
): any[] {
  const searchMapping: any[] = [];
  if (typeof searchFields !== "object") return searchMapping;

  const searchKeys = Object.keys(searchFields).map((key) => key.trim());

  searchKeys.forEach((field) => {
    const type = searchFields[field];
    const specialCharacters = /[.*+?^${}()|[\]\\]/g;
    const sanitizedSearch = searchString.replace(specialCharacters, "\\$&");

    switch (type) {
      case "string":
        searchMapping.push({
          [field]: { [Op.like]: `%${sanitizedSearch}%` },
        });
        break;
      case "date":
        searchMapping.push(
          Sequelize.where(
            Sequelize.fn("TO_CHAR", Sequelize.col(field), "YYYY-MM-DD"),
            { [Op.like]: `%${sanitizedSearch}%` }
          )
        );
        break;
    }
  });

  return searchMapping;
}

function getFilterQuery(
  filterFields: FilterFields,
  queryParams: QueryParams
): any[] {
  const filters: any[] = [];
  if (typeof filterFields !== "object") return filters;

  const filterKeys = Object.keys(filterFields).map((key) => key.trim());
  filterKeys.forEach((field) => {
    let value = queryParams[field]?.trim();
    const checkField = filterFields[field]?.isModifiedFieldName || field;
    if (!value) return;

    const type = filterFields[field].type;
    switch (type) {
      case "string":
        filters.push({ [checkField]: { [Op.like]: value } });
        break;
      case "number":
        const number = parseInt(value);
        if (!isNaN(number)) {
          filters.push(
            Sequelize.where(
              Sequelize.fn("CAST", Sequelize.col(checkField), "VARCHAR"),
              { [Op.like]: number }
            )
          );
        }
        break;
      case "date":
        filters.push(
          Sequelize.where(
            Sequelize.fn("TO_CHAR", Sequelize.col(checkField), "YYYY-MM-DD"),
            { [Op.like]: `%${value}%` }
          )
        );
        break;
      default:
        break;
    }
  });

  return filters;
}

export function getListQuery(
  queryParams: QueryParams,
  searchFields: SearchFields,
  filterFields: FilterFields,
  options: DefaultOptions = {}
): Partial<ListQueryResult> {
  const defaultOpt: DefaultOptions = {
    traceableData: false,
    showDeleted: false,
    ignorePagination: false,
    ignoreSearch: false,
    ignoreFilter: false,
    timezone: process.env.DEFAULT_TIMEZONE,
    ...options,
  };

  // sort and pagination
  const pageNum = queryParams?.pageNum ? parseInt(queryParams.pageNum) : 0;
  const limit = queryParams?.pageLimit ? parseInt(queryParams.pageLimit) : 10;

  const sortField = queryParams?.sortField || "createdAt";
  const sortOrder = queryParams?.sortOrder === "asc" ? "ASC" : "DESC";

  const result: Partial<ListQueryResult> = {
    searchMapping: { [Op.or]: [] },
    filterMapping: { [Op.and]: [] },
    pageNum,
    limit,
    order: [sortField, sortOrder],
  };

  // Add search query
  const searchString = queryParams?.search?.trim();
  if (!defaultOpt.ignoreSearch && searchFields && searchString) {
    const searchQuery = getSearchQuery(searchFields, searchString);
    if (searchQuery.length) {
      result.searchMapping = { [Op.or]: searchQuery };
    }
  }

  // Add filter query
  if (!defaultOpt?.ignoreFilter) {
    const filterQuery = getFilterQuery(filterFields, queryParams);
    if (filterQuery.length) {
      result.filterMapping = { [Op.and]: filterQuery };
    }
  }

  return result;
}
