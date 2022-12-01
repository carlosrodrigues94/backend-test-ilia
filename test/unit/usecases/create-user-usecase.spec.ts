import { ApplicationException } from '@/data/exceptions';

import { DbCreateUserUsecase } from '@/data/usecases';
import { CreateUserUsecasePayload } from '@/domain/usecases';
import { userMock } from '@test/mocks/models/user.mock';
import { userRepositoryMock } from '@test/mocks/repositories/user-repository.mock';
import { uniqueIdServiceMock } from '@test/mocks/services/unique-id-service';

describe('Create user usecase', () => {
  const usecase = new DbCreateUserUsecase(
    uniqueIdServiceMock,
    userRepositoryMock,
  );

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create a user with success', async () => {
    const payload: CreateUserUsecasePayload = {
      document: '123456',
      name: 'user name',
    };

    jest
      .spyOn(userRepositoryMock, 'findUserByDocument')
      .mockImplementationOnce(jest.fn(() => Promise.resolve(undefined)));

    const result = await usecase.execute(payload);

    expect(result).toEqual(userMock);
    expect(userRepositoryMock.createUser).toHaveBeenCalledTimes(1);
    expect(userRepositoryMock.findUserByDocument).toHaveBeenCalledTimes(1);
  });

  it('should not create a user if a user with this document already exists', async () => {
    const payload: CreateUserUsecasePayload = {
      document: userMock.document,
      name: 'user name',
    };

    jest
      .spyOn(userRepositoryMock, 'findUserByDocument')
      .mockImplementationOnce(() => Promise.resolve(userMock));

    await expect(usecase.execute(payload)).rejects.toThrowError(
      new ApplicationException('This user already exists', 400),
    );

    expect(userRepositoryMock.createUser).not.toHaveBeenCalled();
    expect(userRepositoryMock.findUserByDocument).toHaveBeenCalledTimes(1);
  });
});
