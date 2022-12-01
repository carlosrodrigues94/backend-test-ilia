import { TransferModel } from '@/domain/models';

export const transferMock: TransferModel = {
  id: 'uuid',
  amount: 100,
  originAccountId: 'origin-account-id',
  recipientAccountId: 'recipient-account-id',
  createdAt: new Date(),
};
