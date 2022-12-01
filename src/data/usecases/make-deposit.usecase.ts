import { AccountModel, DepositModel } from '@/domain/models';
import {
  MakeDepositUsecase,
  MakeDepositUsecasePayload,
} from '@/domain/usecases';

import {
  FindAccountByIdRepository,
  UpdateAccountRepository,
} from '@/data/repositories/account';

import { UniqueIdService } from '@/data/services';
import { ApplicationException } from '@/data/exceptions';
import { CreateDepositRepository } from '../repositories/deposit';

export class DbMakeDepositUsecase implements MakeDepositUsecase {
  constructor(
    private readonly accountRepository: UpdateAccountRepository &
      FindAccountByIdRepository,
    private readonly depositRepository: CreateDepositRepository,
    private readonly uniqueIdService: UniqueIdService,
  ) {}

  async execute(payload: MakeDepositUsecasePayload): Promise<AccountModel> {
    const deposit: DepositModel = {
      id: this.uniqueIdService.generateUniqueId(),
      userId: payload.userId,
      accountId: payload.accountId,
      amount: payload.amount,
      createdAt: new Date(),
    };

    const account = await this.accountRepository.findAccountById(
      payload.accountId,
    );

    if (!account) {
      throw new ApplicationException('This account do not exists', 400);
    }

    await this.depositRepository.createDeposit(deposit);

    const updatedBalance = account.balance + deposit.amount;

    const updatedAccount = await this.accountRepository.updateAccount(
      payload.accountId,
      {
        balance: updatedBalance,
        updatedAt: new Date(),
      },
    );

    return updatedAccount;
  }
}
