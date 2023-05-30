import { BaseError } from './baseError';

export class NotFound extends BaseError {
  constructor(message = 'No record found') {
    super(message, 404);
  }
}
