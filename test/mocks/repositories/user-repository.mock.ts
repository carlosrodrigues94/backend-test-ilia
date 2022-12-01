import {
  CreateUserRepository,
  FindUserByDocumentRepository,
  FindUserByIdRepository,
} from '@/data/repositories/user';
import { userMock } from '@test/mocks/models/user.mock';

type Repository = CreateUserRepository &
  FindUserByDocumentRepository &
  FindUserByIdRepository;

export const userRepositoryMock: Repository = {
  createUser: jest.fn(() => Promise.resolve(userMock)),
  findUserByDocument: jest.fn(() => Promise.resolve(userMock)),
  findUserById: jest.fn(() => Promise.resolve(userMock)),
};
