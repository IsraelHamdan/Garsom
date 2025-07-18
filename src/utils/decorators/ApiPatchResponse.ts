/* eslint-disable prettier/prettier */
import { applyDecorators, Type } from '@nestjs/common';
import {
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiUnauthorizedResponse,
  ApiUnprocessableEntityResponse,
  ApiInternalServerErrorResponse,
} from '@nestjs/swagger';

export default function ApiPatchResponse<T>(type?: Type<T>) {
  return applyDecorators(
    ApiOkResponse({ description: 'Update successful', type }),
    ApiUnauthorizedResponse({ description: 'Unauthorized update' }),
    ApiNotFoundResponse({ description: 'Resource not found' }),
    ApiUnprocessableEntityResponse({ description: 'Unprocessable Entity' }),
    ApiInternalServerErrorResponse({
      description: 'Internal server exception',
    }),
  );
}
