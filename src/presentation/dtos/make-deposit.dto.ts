import { MakeDepositUsecasePayload } from '@/domain/usecases';
import { IsNotEmpty, IsUUID, IsInt } from 'class-validator';

export class MakeDepositDTO implements MakeDepositUsecasePayload {
  @IsUUID()
  @IsNotEmpty()
  accountId: string;

  @IsInt()
  amount: number;
}
