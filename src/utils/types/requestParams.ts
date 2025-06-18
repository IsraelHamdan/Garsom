/* eslint-disable prettier/prettier */
import { FastifyError, FastifyReply, FastifyRequest } from 'fastify';

export interface RequestParams {
  req: FastifyRequest;
  res: FastifyReply;
  error: FastifyError;
}
