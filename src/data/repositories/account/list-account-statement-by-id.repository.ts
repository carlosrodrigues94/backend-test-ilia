import { AccountStatement } from '@/domain/models';

export interface ListAccountStatementByIdRepository {
  listAccountStatement: (id: string) => Promise<AccountStatement>;
}
