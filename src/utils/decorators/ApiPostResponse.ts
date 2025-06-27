/* eslint-disable prettier/prettier */
import { applyDecorators, Type } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

export default function ApiPostResponse<T>(type?: Type<T>) {
  return applyDecorators(
    ApiResponse({
      status: 201,
      description: 'Resource successfully created.',
      type: type,
    }),
    ApiResponse({
      status: 400,
      description: 'Bad Request. Invalid input data.',
      type: type,
    }),
    ApiResponse({
      status: 401,
      description: 'Unauthorized. Access token is missing or invalid.',
      type: type,
    }),
    ApiResponse({
      status: 409,
      description: 'Conflict. Resource already exists (e.g., duplicate entry).',
      type: type,
    }),
    ApiResponse({
      status: 500,
      description: 'Internal Server Error.',
      type: type,
    }),
  );
}
