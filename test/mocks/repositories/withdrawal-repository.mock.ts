import { CreateWithdrawalRepository } from '@/data/repositories/withdrawal';

import { withdrawalMock } from '@test/mocks/models/withdrawal.mock';

export const withdrawalRepositoryMock: CreateWithdrawalRepository = {
  createWithdrawal: jest.fn(() => Promise.resolve(withdrawalMock)),
};
