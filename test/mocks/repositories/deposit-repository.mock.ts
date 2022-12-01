import { CreateDepositRepository } from '@/data/repositories/deposit';

import { depositMock } from '@test/mocks/models/deposit.mock';

export const depositRepositoryMock: CreateDepositRepository = {
  createDeposit: jest.fn(() => Promise.resolve(depositMock)),
};
