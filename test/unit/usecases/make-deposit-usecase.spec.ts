import { ApplicationException } from '@/data/exceptions';
import { DbMakeDepositUsecase } from '@/data/usecases';
import { MakeDepositUsecasePayload } from '@/domain/usecases';
import { accountMock } from '@test/mocks/models/account.mock';
import { depositMock } from '@test/mocks/models/deposit.mock';
import { accountRepositoryMock } from '@test/mocks/repositories/account-repository.mock';
import { depositRepositoryMock } from '@test/mocks/repositories/deposit-repository.mock';
import { uniqueIdServiceMock } from '@test/mocks/services/unique-id-service';

const mockedDate = new Date('2022-11-30 00:00:00');

jest.useFakeTimers().setSystemTime(mockedDate);

describe('Make deposit usecase', () => {
  const usecase = new DbMakeDepositUsecase(
    accountRepositoryMock,
    depositRepositoryMock,
    uniqueIdServiceMock,
  );

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create a deposit with success', async () => {
    const payload: MakeDepositUsecasePayload = {
      accountId: accountMock.id,
      amount: 100,
    };

    const result = await usecase.execute(payload);

    expect(result).toEqual({
      ...depositMock,
      accountId: payload.accountId,
      createdAt: mockedDate,
    });

    expect(accountRepositoryMock.updateAccount).toHaveBeenCalledWith(
      payload.accountId,
      { balance: accountMock.balance + payload.amount, updatedAt: mockedDate },
    );
  });

  it('should not be possible to make a deposit if the account does not exists', async () => {
    const payload: MakeDepositUsecasePayload = {
      accountId: accountMock.id,
      amount: 100,
    };

    jest
      .spyOn(accountRepositoryMock, 'findAccountById')
      .mockImplementationOnce(() => Promise.resolve(undefined));

    await expect(usecase.execute(payload)).rejects.toThrow(
      new ApplicationException('This account do not exists', 400),
    );

    expect(depositRepositoryMock.createDeposit).not.toHaveBeenCalled();
  });
});
