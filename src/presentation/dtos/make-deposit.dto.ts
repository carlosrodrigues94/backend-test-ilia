import { MakeDepositUsecasePayload } from '@/domain/usecases';
import { IsNotEmpty, IsUUID, IsInt, IsPositive } from 'class-validator';

export class MakeDepositDTO implements MakeDepositUsecasePayload {
  @IsUUID()
  @IsNotEmpty()
  accountId: string;

  @IsInt()
  @IsPositive()
  amount: number;
}
