import { CreateWithdrawalRepository } from '@/data/repositories/withdrawal';
import { WithdrawalModel } from '@/domain/models';
import { Knex, knex } from 'knex';

type Repository = CreateWithdrawalRepository;

export class KnexWithdrawalRepository implements Repository {
  protected tableName = 'withdrawals';

  constructor(private readonly knexConfig: Knex.Config) {}

  async createWithdrawal(data: WithdrawalModel): Promise<WithdrawalModel> {
    const [withdrawal] = await knex(this.knexConfig)
      .table(this.tableName)
      .insert(data)
      .returning<WithdrawalModel[]>('*');

    return withdrawal;
  }
}
