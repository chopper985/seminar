'use strict';
import { NotFoundException } from '@nestjs/common';

export class UserNotFound extends NotFoundException {
  constructor(
    message?: string | Record<string, unknown> | any,
    error?: string,
  ) {
    if (message) {
      super(message, error);
    } else {
      super('User Not Found!');
    }
  }
}