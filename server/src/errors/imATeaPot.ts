import { BaseError } from './baseError';

export class ImATeaPot extends BaseError {
  constructor(message = 'I\'m a teapot') {
    super(message, 418);
  }
}
