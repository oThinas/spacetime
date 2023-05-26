export interface IDataReply {
  pageable?: {
    page: number;
    size: number;
    totalRecords: number;
    totalPages: number;
  };
  data: any[];
}
