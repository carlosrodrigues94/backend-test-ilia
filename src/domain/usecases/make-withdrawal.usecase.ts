import { WithdrawalModel } from '@/domain/models';

export interface MakeWithdrawalUsecasePayload {
  accountId: string;
  amount: number;
}

export interface MakeWithdrawalUsecase {
  execute(payload: MakeWithdrawalUsecasePayload): Promise<WithdrawalModel>;
}
