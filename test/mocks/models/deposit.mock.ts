import { DepositModel } from '@/domain/models';

export const depositMock: DepositModel = {
  id: 'uuid',
  amount: 100,
  accountId: 'account-uuid',
  createdAt: new Date(),
};
