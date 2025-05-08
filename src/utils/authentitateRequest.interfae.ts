/* eslint-disable prettier/prettier */
import { Request } from 'express';

export interface AuthenticatedRequest extends Request {
  user?: any;
}
