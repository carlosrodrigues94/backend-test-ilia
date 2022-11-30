import { AccountModel } from '../models';

export interface MakeDepositUsecasePayload {
  userId: string;
  accountId: string;
  amount: number;
}

export interface MakeDepositUsecaseResult {
  depositId: string;
  depositAmount: number;
  totalBalance: number;
}

export interface MakeDepositUsecase {
  execute(data: MakeDepositUsecasePayload): Promise<AccountModel>;
}
