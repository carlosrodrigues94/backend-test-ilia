import { CreateUserUsecasePayload } from '@/domain/usecases';
import { IsNotEmpty, IsString } from 'class-validator';
export class CreateUserDTO implements CreateUserUsecasePayload {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  document: string;
}
