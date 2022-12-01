import { DepositModel } from '@/domain/models';

export interface CreateDepositRepository {
  createDeposit: (data: DepositModel) => Promise<DepositModel>;
}
