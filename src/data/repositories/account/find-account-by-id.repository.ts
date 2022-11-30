import { AccountModel } from '@/domain/models';

export interface FindAccountByIdRepository {
  findAccountById: (id: string) => Promise<AccountModel>;
}
