import { AccountStatement } from '@/domain/models';

export interface GetAccountStatementUsecasePayload {
  accountId: string;
}

export interface GetAccountStatementUsecase {
  execute(
    payload: GetAccountStatementUsecasePayload,
  ): Promise<AccountStatement>;
}
