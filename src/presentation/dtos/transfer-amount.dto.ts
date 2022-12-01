import { IsInt, IsNotEmpty, IsPositive, IsUUID } from 'class-validator';
import { TransferAmountUsecasePayload } from '@/domain/usecases';

export class TransferAmountDTO implements TransferAmountUsecasePayload {
  @IsUUID()
  @IsNotEmpty()
  originAccountId: string;

  @IsUUID()
  @IsNotEmpty()
  recipientAccountId: string;

  @IsInt()
  @IsPositive()
  amount: number;
}
