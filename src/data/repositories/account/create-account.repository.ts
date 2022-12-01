import { AccountModel } from '@/domain/models';

export interface CreateAccountRepository {
  createAccount: (data: AccountModel) => Promise<AccountModel>;
}
