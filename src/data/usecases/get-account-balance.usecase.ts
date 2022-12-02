import {
  GetAccountBalanceUsecase,
  GetAccountBalanceUsecasePayload,
} from '@/domain/usecases';

import { FindAccountByIdRepository } from '@/data/repositories/account';
import { ApplicationException } from '../exceptions';

export class DbGetAccountBalanceUsecase implements GetAccountBalanceUsecase {
  constructor(private readonly accountRepository: FindAccountByIdRepository) {}
  async execute(
    payload: GetAccountBalanceUsecasePayload,
  ): Promise<{ id: string; balance: number }> {
    const account = await this.accountRepository.findAccountById(
      payload.accountId,
    );

    if (!account) {
      throw new ApplicationException('This account does not exists', 400);
    }

    const { id, balance } = account;

    return { id, balance };
  }
}
