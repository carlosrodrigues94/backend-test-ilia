import { CreateDepositRepository } from '@/data/repositories/deposit';
import { DepositModel } from '@/domain/models';
import { Knex, knex } from 'knex';

type Repository = CreateDepositRepository;

export class KnexDepositRepository implements Repository {
  protected tableName = 'deposits';

  constructor(private readonly knexConfig: Knex.Config) {}

  async createDeposit(data: DepositModel): Promise<DepositModel> {
    const [deposit] = await knex(this.knexConfig)
      .table(this.tableName)
      .insert(data)
      .returning<DepositModel[]>('*');

    return deposit;
  }
}
