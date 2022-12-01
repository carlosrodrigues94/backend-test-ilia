import { TransferModel } from '@/domain/models';

export interface TransferAmountUsecasePayload {
  originAccountId: string;
  recipientAccountId: string;
  amount: number;
}

export interface TransferAmountUsecase {
  execute(payload: TransferAmountUsecasePayload): Promise<TransferModel>;
}
