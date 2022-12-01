import { ApplicationException } from '@/data/exceptions';
import { DbCreateAccountUsecase } from '@/data/usecases';
import { CreateAccountUsecasePayload } from '@/domain/usecases';
import { accountMock } from '@test/mocks/models/account.mock';
import { accountRepositoryMock } from '@test/mocks/repositories/account-repository.mock';
import { userRepositoryMock } from '@test/mocks/repositories/user-repository.mock';
import { uniqueIdServiceMock } from '@test/mocks/services/unique-id-service';

describe('Create account usecase', () => {
  const usecase = new DbCreateAccountUsecase(
    uniqueIdServiceMock,
    accountRepositoryMock,
    userRepositoryMock,
  );

  it('should create account with success', async () => {
    const payload: CreateAccountUsecasePayload = {
      balance: 100,
      userId: 'user-id',
    };
    const result = await usecase.execute(payload);

    expect(result).toEqual(accountMock);
  });

  it('should not be create a account if user does not exists', async () => {
    const payload: CreateAccountUsecasePayload = {
      balance: 100,
      userId: 'user-id',
    };

    jest
      .spyOn(userRepositoryMock, 'findUserById')
      .mockImplementationOnce(jest.fn(() => Promise.resolve(undefined)));

    await expect(usecase.execute(payload)).rejects.toThrowError(
      new ApplicationException(
        'This userId is invalid because not exists',
        400,
      ),
    );
  });
});
