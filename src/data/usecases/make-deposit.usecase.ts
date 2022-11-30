import { AccountModel, DepositModel } from '@/domain/models';
import {
  MakeDepositUsecase,
  MakeDepositUsecasePayload,
} from '@/domain/usecases';

import {
  FindByIdAccountRepository,
  UpdateAccountRepository,
} from '@/data/repositories/account';

import { UniqueIdService } from '@/data/services';
import { ApplicationException } from '@/data/exceptions';

export class DbMakeDepositUsecase implements MakeDepositUsecase {
  constructor(
    private readonly accountRepository: UpdateAccountRepository &
      FindByIdAccountRepository,
    private readonly uniqueIdService: UniqueIdService,
  ) {}

  async execute(data: MakeDepositUsecasePayload): Promise<AccountModel> {
    const deposit: DepositModel = {
      id: this.uniqueIdService.generateUniqueId(),
      userId: data.userId,
      accountId: data.accountId,
      amount: data.amount,
      createdAt: new Date(),
    };

    const account = await this.accountRepository.findAccountById(
      data.accountId,
    );

    if (!account) {
      throw new ApplicationException('This account do not exists', 400);
    }

    const updatedBalance = account.balance + deposit.amount;

    const updatedAccount = await this.accountRepository.updateAccount(
      data.accountId,
      {
        balance: updatedBalance,
        updatedAt: new Date(),
      },
    );

    return updatedAccount;
  }
}
