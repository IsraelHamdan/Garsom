/* eslint-disable prettier/prettier */
import { IsString } from 'class-validator';

export class TableParticipantsResponseDTO {
  @IsString()
  id: string;

  @IsString()
  userId: string;

  @IsString()
  tableId: string;
}
