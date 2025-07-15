/* eslint-disable prettier/prettier */
import { applyDecorators, Type } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

export default function ApiPatchResponse<T>(type?: Type<T>) {
  return applyDecorators(
    ApiResponse({
      status: 200,
      description: 'Update was successfull',
      type: type,
    }),
    ApiResponse({
      status: 404,
      description: 'Resource not found',
      type: type,
    }),
    ApiResponse({
      status: 401,
      description: 'Unauthorized update',
      type: type,
    }),
    ApiResponse({
      status: 404,
      description: 'Resource not found',
      type: type,
    }),
    ApiResponse({
      status: 422,
      description: 'Unprocessable Entity ',
      type: type,
    }),
    ApiResponse({
      status: 500,
      description: 'Internal server exception',
      type: type,
    }),
  );
}
