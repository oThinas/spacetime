export interface IZodError {
  issues: {
    validation: string;
    code: string;
    message: string;
    path: string[];
  }[];
}
