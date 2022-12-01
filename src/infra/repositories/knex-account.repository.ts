import {
  CreateAccountRepository,
  FindAccountByIdRepository,
  UpdateAccountRepository,
} from '@/data/repositories/account';
import { AccountModel } from '@/domain/models';
import { Knex, knex } from 'knex';

type Repository = UpdateAccountRepository &
  FindAccountByIdRepository &
  CreateAccountRepository;

export class KnexAccountRepository implements Repository {
  protected tableName = 'accounts';

  constructor(private readonly knexConfig: Knex.Config) {}

  async createAccount(data: AccountModel): Promise<AccountModel> {
    const [account] = await knex(this.knexConfig)
      .table(this.tableName)
      .insert(data)
      .returning<AccountModel[]>('*');

    return account;
  }

  async findAccountById(id: string) {
    const [account] = await knex(this.knexConfig)
      .table(this.tableName)
      .select('*')
      .where({ id })
      .returning<AccountModel[]>('*');

    return account;
  }

  async updateAccount(id: string, data: Partial<AccountModel>) {
    const [account] = await knex(this.knexConfig)
      .table(this.tableName)
      .select('*')
      .where({ id })
      .update(data)
      .returning<AccountModel[]>('*');

    return account;
  }
}
