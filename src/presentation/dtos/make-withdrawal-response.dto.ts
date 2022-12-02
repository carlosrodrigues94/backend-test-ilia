import { WithdrawalModel } from '@/domain/models';

export class MakeWithdrawalResponseDTO implements WithdrawalModel {
  id: string;
  accountId: string;
  amount: number;
  createdAt: Date;
}
