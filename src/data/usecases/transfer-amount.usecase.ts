import { TransferModel } from '@/domain/models';
import {
  TransferAmountUsecase,
  TransferAmountUsecasePayload,
} from '@/domain/usecases';

import {
  FindAccountByIdRepository,
  UpdateAccountRepository,
} from '@/data/repositories/account';

import { UniqueIdService } from '@/data/services';
import { ApplicationException } from '@/data/exceptions';
import { CreateTransferRepository } from '@/data/repositories/transfer';

export class DbTransferAmountUsecase implements TransferAmountUsecase {
  constructor(
    private readonly accountRepository: UpdateAccountRepository &
      FindAccountByIdRepository,
    private readonly transferRepository: CreateTransferRepository,
    private readonly uniqueIdService: UniqueIdService,
  ) {}

  async execute(payload: TransferAmountUsecasePayload): Promise<TransferModel> {
    const originAccount = await this.accountRepository.findAccountById(
      payload.originAccountId,
    );

    const recipientAccount = await this.accountRepository.findAccountById(
      payload.recipientAccountId,
    );

    if (!originAccount) {
      throw new ApplicationException('This account origin do not exists', 400);
    }

    if (!recipientAccount) {
      throw new ApplicationException(
        'This account recipient do not exists',
        400,
      );
    }

    if (originAccount.balance < payload.amount) {
      throw new ApplicationException(
        "You don't have enough balance to do this.",
        400,
      );
    }

    await this.accountRepository.updateAccount(payload.originAccountId, {
      balance: originAccount.balance - payload.amount,
      updatedAt: new Date(),
    });

    await this.accountRepository.updateAccount(payload.recipientAccountId, {
      balance: recipientAccount.balance + payload.amount,
      updatedAt: new Date(),
    });

    const data: TransferModel = {
      id: this.uniqueIdService.generateUniqueId(),
      originAccountId: payload.originAccountId,
      recipientAccountId: payload.recipientAccountId,
      amount: payload.amount,
      createdAt: new Date(),
    };

    const transfer = await this.transferRepository.createTransfer(data);

    return transfer;
  }
}
