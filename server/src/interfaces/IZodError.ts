export interface IZodError {
  issues: {
    code: string;
    message: string;
    path: string[];
    expected?: string;
    received?: string;
    validation?: string;
  }[];
}
