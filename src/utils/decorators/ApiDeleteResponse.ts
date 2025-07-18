/* eslint-disable prettier/prettier */
import { applyDecorators, Type } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

export default function ApiDeleteResponse<T>(type?: Type<T>) {
  return applyDecorators(
    ApiOkResponse({ description: 'Delete successful', type }),
    ApiUnauthorizedResponse({ description: "Delete wasn't permitted" }),
    ApiBadRequestResponse({ description: 'Bad request' }),
    ApiNotFoundResponse({ description: 'Resource not found', type }),
    ApiInternalServerErrorResponse({ description: 'Internal Server Error.' }),
  );
}
