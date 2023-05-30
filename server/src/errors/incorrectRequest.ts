import { BaseError } from './baseError';

export class IncorrectRequest extends BaseError {
  constructor(message = 'Incorrect request') {
    super(message, 400);
  }
}
