import { AccountModel } from '@/domain/models';

export const accountMock: AccountModel = {
  id: 'uuid',
  balance: 100,
  userId: 'user-uuid',
  updatedAt: null,
  createdAt: new Date(),
};
