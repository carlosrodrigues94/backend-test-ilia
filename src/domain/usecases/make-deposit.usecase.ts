import { DepositModel } from '@/domain/models';

export interface MakeDepositUsecasePayload {
  accountId: string;
  amount: number;
}

export interface MakeDepositUsecase {
  execute(payload: MakeDepositUsecasePayload): Promise<DepositModel>;
}
