import { WithdrawalModel } from '@/domain/models';
import {
  MakeWithdrawalUsecase,
  MakeWithdrawalUsecasePayload,
} from '@/domain/usecases';

import {
  FindAccountByIdRepository,
  UpdateAccountRepository,
} from '@/data/repositories/account';

import { UniqueIdService } from '@/data/services';
import { ApplicationException } from '@/data/exceptions';
import { CreateWithdrawalRepository } from '../repositories/withdrawal';

export class DbMakeWithdrawalUsecase implements MakeWithdrawalUsecase {
  constructor(
    private readonly accountRepository: UpdateAccountRepository &
      FindAccountByIdRepository,
    private readonly withdrawalRepository: CreateWithdrawalRepository,
    private readonly uniqueIdService: UniqueIdService,
  ) {}

  async execute(
    payload: MakeWithdrawalUsecasePayload,
  ): Promise<WithdrawalModel> {
    const account = await this.accountRepository.findAccountById(
      payload.accountId,
    );

    if (!account) {
      throw new ApplicationException('This account do not exists', 400);
    }

    if (account.balance < payload.amount) {
      throw new ApplicationException(
        "You don't have enough balance to do this.",
        400,
      );
    }

    const withdrawal: WithdrawalModel = {
      id: this.uniqueIdService.generateUniqueId(),
      accountId: payload.accountId,
      amount: payload.amount,
      createdAt: new Date(),
    };

    await this.withdrawalRepository.createWithdrawal(withdrawal);

    const updatedBalance = account.balance - withdrawal.amount;

    await this.accountRepository.updateAccount(payload.accountId, {
      balance: updatedBalance,
      updatedAt: new Date(),
    });

    return withdrawal;
  }
}
