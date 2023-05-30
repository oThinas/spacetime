export interface IDataReply {
  pageable?: {
    page: number;
    size: number;
    totalRecords: number;
    totalPages: number;
  };
  oldData?: any[] | object;
  newData?: any[] | object;
  data?: any[];
}
