import { TransferModel } from '@/domain/models';

export interface CreateTransferRepository {
  createTransfer(data: TransferModel): Promise<TransferModel>;
}
