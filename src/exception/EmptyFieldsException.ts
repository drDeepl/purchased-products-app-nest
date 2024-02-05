import { HttpException, HttpStatus } from '@nestjs/common';

export class EmptyFieldsException extends HttpException {
  constructor(msg: string) {
    super(msg, HttpStatus.FORBIDDEN);
  }
}
