import { AccountModel } from '@/domain/models';

export interface UpdateAccountRepository {
  updateAccount: (
    id: string,
    data: Partial<AccountModel>,
  ) => Promise<AccountModel>;
}
