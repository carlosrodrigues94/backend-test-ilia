import { ApplicationException } from '@/data/exceptions';
import { DbGetAccountStatementUsecase } from '@/data/usecases';
import { AccountStatement } from '@/domain/models';
import { accountMock } from '@test/mocks/models/account.mock';
import { accountRepositoryMock } from '@test/mocks/repositories/account-repository.mock';

describe('Get account statement usecase', () => {
  const usecase = new DbGetAccountStatementUsecase(accountRepositoryMock);

  it('should get the account statement', async () => {
    const result = await usecase.execute({ accountId: accountMock.id });

    expect(result).toEqual(<AccountStatement>{
      id: accountMock.id,
      balance: accountMock.balance,
      createdAt: accountMock.createdAt,
      deposits: [],
      transfers: [],
      userId: accountMock.userId,
      updatedAt: accountMock.updatedAt,
    });
  });

  it('should get a error if account does not exists', async () => {
    jest
      .spyOn(accountRepositoryMock, 'listAccountStatement')
      .mockImplementationOnce(jest.fn(() => Promise.resolve(undefined)));

    await expect(
      usecase.execute({ accountId: accountMock.id }),
    ).rejects.toThrowError(
      new ApplicationException('This account does not exists', 400),
    );
  });
});
