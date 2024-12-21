import { Op, WhereOptions } from "sequelize";
export type SearchFields = {
  [key: string]: string;
};

export type QueryParams = {
  [key: string]: string | undefined;
  pageNum?: string;
  pageLimit?: string;
  sortField?: string;
  sortOrder?: "asc" | "desc";
  search?: string;
};

export type FilterFields = {
  [key: string]: {
    type: string;
    isModifiedFieldName?: string;
    multiple?: boolean;
    isBetween?: boolean;
  };
};

export type DefaultOptions = {
  traceableData?: boolean;
  showDeleted?: boolean;
  ignorePagination?: boolean;
  ignoreSearch?: boolean;
  ignoreFilter?: boolean;
  formatDate?: boolean;
  isIdToStringRequired?: boolean;
  timezone?: string;
};

export type ListQueryResult = {
  searchMapping: SearchMappingType;
  filterMapping: FilterMappingType;
  pageNum: number;
  limit: number;
  order: [string, string];
};

export type SearchMappingType = {
  [Op.or]: Array<WhereOptions<any>>;
};

export type FilterMappingType = {
  [Op.and]: Array<WhereOptions<any>>;
};
