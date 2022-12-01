import { ApplicationException } from '@/data/exceptions';
import { DbTransferAmountUsecase } from '@/data/usecases';
import { AccountModel, TransferModel } from '@/domain/models';
import { TransferAmountUsecasePayload } from '@/domain/usecases';
import { accountRepositoryMock } from '@test/mocks/repositories/account-repository.mock';
import { transferRepositoryMock } from '@test/mocks/repositories/transfer-repository.mock';
import { uniqueIdServiceMock } from '@test/mocks/services/unique-id-service';

const mockedDate = new Date('2022-11-30 00:00:00');

jest.useFakeTimers().setSystemTime(mockedDate);

describe('Transfer Amount usecase', () => {
  const originAccountMock: AccountModel = {
    id: 'origin-account-id',
    balance: 1000,
    userId: 'user-id',
    updatedAt: null,
    createdAt: '2022-05-05 00:00:00' as unknown as Date,
  };
  const recipientAccountMock: AccountModel = {
    id: 'recipient-account-id',
    balance: 500,
    userId: 'user-id',
    createdAt: '2022-05-05 00:00:00' as unknown as Date,
    updatedAt: null,
  };

  const usecase = new DbTransferAmountUsecase(
    accountRepositoryMock,
    transferRepositoryMock,
    uniqueIdServiceMock,
  );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should transfer amount with success', async () => {
    jest
      .spyOn(accountRepositoryMock, 'findAccountById')
      .mockImplementationOnce(jest.fn(() => Promise.resolve(originAccountMock)))
      .mockImplementationOnce(
        jest.fn(() => Promise.resolve(recipientAccountMock)),
      );

    const payload: TransferAmountUsecasePayload = {
      amount: 100,
      originAccountId: originAccountMock.id,
      recipientAccountId: recipientAccountMock.id,
    };

    const expected: TransferModel = {
      ...payload,
      id: 'transfer',
      createdAt: mockedDate,
    };

    jest
      .spyOn(transferRepositoryMock, 'createTransfer')
      .mockImplementationOnce(jest.fn(() => Promise.resolve(expected)));

    const result = await usecase.execute(payload);

    expect(result).toEqual(expected);
  });

  it('should get a error if origin account does not have enough balance', async () => {
    jest
      .spyOn(accountRepositoryMock, 'findAccountById')
      .mockImplementationOnce(jest.fn(() => Promise.resolve(originAccountMock)))
      .mockImplementationOnce(
        jest.fn(() => Promise.resolve(recipientAccountMock)),
      );

    // Origin account mock has 1000 of balance
    const payload: TransferAmountUsecasePayload = {
      amount: 2000,
      originAccountId: originAccountMock.id,
      recipientAccountId: recipientAccountMock.id,
    };

    await expect(usecase.execute(payload)).rejects.toThrowError(
      new ApplicationException(
        "You don't have enough balance to do this.",
        400,
      ),
    );

    expect(transferRepositoryMock.createTransfer).not.toHaveBeenCalled();
  });

  it('should get a error if origin account does not exists', async () => {
    jest
      .spyOn(accountRepositoryMock, 'findAccountById')
      .mockImplementationOnce(jest.fn(() => Promise.resolve(undefined)));

    const payload: TransferAmountUsecasePayload = {
      amount: 100,
      originAccountId: originAccountMock.id,
      recipientAccountId: recipientAccountMock.id,
    };

    await expect(usecase.execute(payload)).rejects.toThrowError(
      new ApplicationException('This account origin do not exists', 400),
    );
  });
  it('should get a error if recipient account does not exists', async () => {
    jest
      .spyOn(accountRepositoryMock, 'findAccountById')
      .mockImplementationOnce(jest.fn(() => Promise.resolve(originAccountMock)))
      .mockImplementationOnce(jest.fn(() => Promise.resolve(undefined)));

    const payload: TransferAmountUsecasePayload = {
      amount: 100,
      originAccountId: originAccountMock.id,
      recipientAccountId: recipientAccountMock.id,
    };

    await expect(usecase.execute(payload)).rejects.toThrowError(
      new ApplicationException('This account recipient do not exists', 400),
    );
  });
});
