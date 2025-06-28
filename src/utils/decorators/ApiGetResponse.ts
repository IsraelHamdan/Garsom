/* eslint-disable prettier/prettier */
import { applyDecorators, Type } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

export default function ApiGetResponse<T>(type?: Type<T>) {
  return applyDecorators(
    ApiResponse({
      status: 200,
      description: 'Resource retrieved successfully.',
      type: type,
    }),
    ApiResponse({
      status: 400,
      description: 'Bad Request.',
      type: type,
    }),
    ApiResponse({
      status: 401,
      description: 'Unauthorized.',
      type: type,
    }),
    ApiResponse({
      status: 404,
      description: 'Not Found.',
      type: type,
    }),
    ApiResponse({
      status: 500,
      description: 'Internal Server Error.',
      type: type,
    }),
  );
}
