import {
  CreateAccountRepository,
  FindAccountByIdRepository,
  ListAccountStatementByIdRepository,
  UpdateAccountRepository,
} from '@/data/repositories/account';

import { accountMock } from '@test/mocks/models/account.mock';

type Repository = FindAccountByIdRepository &
  UpdateAccountRepository &
  CreateAccountRepository &
  ListAccountStatementByIdRepository;

export const accountRepositoryMock: Repository = {
  updateAccount: jest.fn(() =>
    Promise.resolve({ ...accountMock, updatedAt: new Date() }),
  ),
  findAccountById: jest.fn(() => Promise.resolve(accountMock)),
  createAccount: jest.fn(() => Promise.resolve(accountMock)),
  listAccountStatement: jest.fn(() =>
    Promise.resolve({ ...accountMock, transfers: [], deposits: [] }),
  ),
};
