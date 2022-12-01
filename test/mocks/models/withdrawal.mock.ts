import { WithdrawalModel } from '@/domain/models';

export const withdrawalMock: WithdrawalModel = {
  id: 'uuid',
  amount: 100,
  accountId: 'account-uuid',
  createdAt: new Date(),
};
