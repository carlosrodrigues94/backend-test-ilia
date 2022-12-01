import { MakeWithdrawalUsecasePayload } from '@/domain/usecases';
import { IsNotEmpty, IsUUID, IsInt } from 'class-validator';

export class MakeWithdrawalDTO implements MakeWithdrawalUsecasePayload {
  @IsUUID()
  @IsNotEmpty()
  accountId: string;

  @IsInt()
  amount: number;
}
