import { CreateTransferRepository } from '@/data/repositories/transfer';
import { TransferModel } from '@/domain/models';
import { Knex, knex } from 'knex';

type Repository = CreateTransferRepository;

export class KnexTransferRepository implements Repository {
  protected tableName = 'transfers';

  constructor(private readonly knexConfig: Knex.Config) {}

  async createTransfer(data: TransferModel): Promise<TransferModel> {
    const [user] = await knex(this.knexConfig)
      .table(this.tableName)
      .insert(data)
      .returning<TransferModel[]>('*');

    return user;
  }
}
