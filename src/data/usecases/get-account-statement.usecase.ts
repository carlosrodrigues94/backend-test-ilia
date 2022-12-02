import {
  GetAccountStatementUsecase,
  GetAccountStatementUsecasePayload,
} from '@/domain/usecases';

import { ListAccountStatementByIdRepository } from '@/data/repositories/account';
import { AccountStatement } from '@/domain/models';
import { ApplicationException } from '../exceptions';

export class DbGetAccountStatementUsecase
  implements GetAccountStatementUsecase
{
  constructor(
    private readonly accountRepository: ListAccountStatementByIdRepository,
  ) {}
  async execute(
    payload: GetAccountStatementUsecasePayload,
  ): Promise<AccountStatement> {
    const result = await this.accountRepository.listAccountStatement(
      payload.accountId,
    );
    if (!result) {
      throw new ApplicationException('This account does not exists', 400);
    }

    return result;
  }
}
