import { WithdrawalModel } from '@/domain/models';

export interface CreateWithdrawalRepository {
  createWithdrawal: (data: WithdrawalModel) => Promise<WithdrawalModel>;
}
