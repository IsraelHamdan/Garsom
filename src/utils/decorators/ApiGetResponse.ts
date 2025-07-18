/* eslint-disable prettier/prettier */
import { applyDecorators, Type } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

export default function ApiGetResponse<T>(type?: Type<T>) {
  return applyDecorators(
    ApiOkResponse({ description: 'Resource retrieved successfully.', type }),
    ApiBadRequestResponse({ description: 'Bad Request.' }),
    ApiUnauthorizedResponse({ description: 'Unauthorized.' }),
    ApiNotFoundResponse({ description: 'Not Found.', type }),
    ApiInternalServerErrorResponse({ description: 'Internal Server Error.' }),
  );
}
