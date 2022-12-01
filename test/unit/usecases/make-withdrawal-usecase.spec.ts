import { ApplicationException } from '@/data/exceptions';

import { DbMakeWithdrawalUsecase } from '@/data/usecases';
import { MakeWithdrawalUsecasePayload } from '@/domain/usecases';
import { accountMock } from '@test/mocks/models/account.mock';
import { withdrawalMock } from '@test/mocks/models/withdrawal.mock';
import { accountRepositoryMock } from '@test/mocks/repositories/account-repository.mock';
import { withdrawalRepositoryMock } from '@test/mocks/repositories/withdrawal-repository.mock';
import { uniqueIdServiceMock } from '@test/mocks/services/unique-id-service';

const mockedDate = new Date('2022-11-30 00:00:00');

jest.useFakeTimers().setSystemTime(mockedDate);

describe('Make withdrawal usecase', () => {
  const usecase = new DbMakeWithdrawalUsecase(
    accountRepositoryMock,
    withdrawalRepositoryMock,
    uniqueIdServiceMock,
  );

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create a withdrawal with success', async () => {
    const payload: MakeWithdrawalUsecasePayload = {
      accountId: accountMock.id,
      amount: 100,
    };

    const result = await usecase.execute(payload);

    expect(result).toEqual({
      ...withdrawalMock,
      accountId: payload.accountId,
      createdAt: mockedDate,
    });
    expect(accountRepositoryMock.updateAccount).toHaveBeenCalledWith(
      payload.accountId,
      {
        balance: accountMock.balance - payload.amount,
        updatedAt: mockedDate,
      },
    );
  });

  it('should not be possible to make a withdrawal if the account does not exists', async () => {
    const payload: MakeWithdrawalUsecasePayload = {
      accountId: accountMock.id,
      amount: 100,
    };
    const spyAccountRepository = jest.spyOn(
      accountRepositoryMock,
      'findAccountById',
    );

    spyAccountRepository.mockImplementationOnce(
      jest.fn(() => Promise.resolve(undefined)),
    );

    await expect(usecase.execute(payload)).rejects.toThrow(
      new ApplicationException('This account do not exists', 400),
    );
    expect(withdrawalRepositoryMock.createWithdrawal).not.toHaveBeenCalled();
  });

  it('should not be possible to make a withdrawal if the account does not have enougth balance', async () => {
    const payload: MakeWithdrawalUsecasePayload = {
      accountId: accountMock.id,
      amount: 999999,
    };

    await expect(usecase.execute(payload)).rejects.toThrowError(
      new ApplicationException(
        "You don't have enough balance to do this.",
        400,
      ),
    );

    expect(withdrawalRepositoryMock.createWithdrawal).not.toHaveBeenCalled();
  });
});
