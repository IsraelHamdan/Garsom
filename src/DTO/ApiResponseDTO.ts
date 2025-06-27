/* eslint-disable prettier/prettier */
export class ApiResponseDto<T> {
  statusCode: number;
  message: string;
  data?: T;
}
