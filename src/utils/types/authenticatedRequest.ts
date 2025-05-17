/* eslint-disable prettier/prettier */
import { Request } from 'express';
import { TokenPayload } from 'src/DTO/token/tokenPayload';

export interface AuthenticatedRequest extends Request {
  user: TokenPayload;
}
