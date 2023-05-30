export interface IZodError {
  issues: {
    code: string;
    message: string;
    path: string[];
    keys: string[];
    expected?: string;
    received?: string;
    validation?: string;
  }[];
}
