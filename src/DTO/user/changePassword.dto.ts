import { IsString, IsStrongPassword } from 'class-validator';

export class ChangePasswordDTO {
  @IsString()
  oldPassword: string;
  
  @IsStrongPassword()
  newPassword: string;
  
  @IsString()
  newPasswordConfirm: string;
  
}