import { ApplicationException } from '@/data/exceptions';
import { DbGetAccountBalanceUsecase } from '@/data/usecases';
import { accountMock } from '@test/mocks/models/account.mock';
import { accountRepositoryMock } from '@test/mocks/repositories/account-repository.mock';

describe('Get account balance usecase', () => {
  const usecase = new DbGetAccountBalanceUsecase(accountRepositoryMock);

  it('should get the account balance', async () => {
    const result = await usecase.execute({ accountId: accountMock.id });

    expect(result).toEqual({
      id: accountMock.id,
      balance: accountMock.balance,
    });
  });

  it('should get a error if account does not exists', async () => {
    jest
      .spyOn(accountRepositoryMock, 'findAccountById')
      .mockImplementationOnce(jest.fn(() => Promise.resolve(undefined)));

    await expect(
      usecase.execute({ accountId: accountMock.id }),
    ).rejects.toThrowError(
      new ApplicationException('This account does not exists', 400),
    );
  });
});
