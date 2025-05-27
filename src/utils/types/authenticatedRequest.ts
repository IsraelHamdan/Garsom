/* eslint-disable prettier/prettier */
import { FastifyRequest } from 'fastify';
import { TokenPayload } from 'src/DTO/token/tokenPayload';

export interface AuthenticatedRequest extends FastifyRequest {
  user: TokenPayload;
}
