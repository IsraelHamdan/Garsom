/* eslint-disable prettier/prettier */
import { applyDecorators, Type } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

export default function ApiPostResponse<T>(type?: Type<T>) {
  return applyDecorators(
    ApiCreatedResponse({ description: 'Resource successfully created.', type }),
    ApiBadRequestResponse({ description: 'Bad Request. Invalid input data.' }),
    ApiUnauthorizedResponse({
      description: 'Unauthorized. Missing or invalid token.',
    }),
    ApiConflictResponse({ description: 'Conflict. Resource already exists.' }),
    ApiInternalServerErrorResponse({ description: 'Internal Server Error.' }),
  );
}
