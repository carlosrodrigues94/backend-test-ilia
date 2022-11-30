import { AccountModel } from '@/domain/models';

export interface FindByIdAccountRepository {
  findAccountById: (id: string) => Promise<AccountModel>;
}
