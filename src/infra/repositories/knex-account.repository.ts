import {
  CreateAccountRepository,
  FindAccountByIdRepository,
  UpdateAccountRepository,
  ListAccountStatementByIdRepository,
} from '@/data/repositories/account';
import {
  AccountModel,
  AccountStatement,
  DepositModel,
  TransferModel,
} from '@/domain/models';
import { Knex, knex } from 'knex';

type Repository = UpdateAccountRepository &
  FindAccountByIdRepository &
  CreateAccountRepository &
  ListAccountStatementByIdRepository;

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

  async listAccountStatement(accountId: string): Promise<AccountStatement> {
    const [account] = await knex(this.knexConfig)
      .select('*')
      .from(this.tableName)
      .where({ id: accountId })
      .returning<AccountModel[]>('*');

    if (!account) {
      return;
    }

    const transfers = await knex(this.knexConfig)
      .select(['id', 'amount', 'recipientAccountId', 'createdAt'])
      .from('transfers')
      .where({ originAccountId: accountId })
      .orWhere({ recipientAccountId: accountId })
      .returning<TransferModel[]>('*');

    const deposits = await knex(this.knexConfig)
      .select(['id', 'amount', 'createdAt'])
      .from('deposits')
      .where({ accountId })
      .returning<DepositModel[]>('*');

    const result = {
      ...account,
      deposits,
      transfers: [
        ...transfers.map((item) => {
          if (item.recipientAccountId === accountId) {
            return item;
          }
          return { ...item, amount: -item.amount };
        }),
      ],
    };

    return result;
  }
}
