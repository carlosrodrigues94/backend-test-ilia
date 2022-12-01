import { CreateAccountUsecasePayload } from '@/domain/usecases';
import { IsNotEmpty, IsUUID, IsInt } from 'class-validator';

export class CreateAccountDTO implements CreateAccountUsecasePayload {
  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @IsInt()
  balance: number;
}
