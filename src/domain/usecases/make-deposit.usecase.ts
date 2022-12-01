import { AccountModel } from '@/domain/models';

export interface MakeDepositUsecasePayload {
  userId: string;
  accountId: string;
  amount: number;
}

export interface MakeDepositUsecase {
  execute(payload: MakeDepositUsecasePayload): Promise<AccountModel>;
}
