import { MakeWithdrawalUsecasePayload } from '@/domain/usecases';
import { IsNotEmpty, IsUUID, IsInt, IsPositive } from 'class-validator';

export class MakeWithdrawalDTO implements MakeWithdrawalUsecasePayload {
  @IsUUID()
  @IsNotEmpty()
  accountId: string;

  @IsInt()
  @IsPositive()
  amount: number;
}
