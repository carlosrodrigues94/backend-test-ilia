import { CreateTransferRepository } from '@/data/repositories/transfer';
import { transferMock } from '@test/mocks/models/transfer.mock';

export const transferRepositoryMock: CreateTransferRepository = {
  createTransfer: jest.fn(() => Promise.resolve(transferMock)),
};
