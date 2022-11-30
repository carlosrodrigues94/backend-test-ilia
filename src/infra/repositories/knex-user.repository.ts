import {
  CreateUserRepository,
  FindUserByDocumentRepository,
} from '@/data/repositories/user';
import { UserModel } from '@/domain/models/user';
import { Knex, knex } from 'knex';

type Repository = CreateUserRepository & FindUserByDocumentRepository;

export class KnexUserRepository implements Repository {
  protected tableName = 'users';

  constructor(private readonly knexConfig: Knex.Config) {}

  async createUser(data: UserModel) {
    const [user] = await knex(this.knexConfig)
      .table(this.tableName)
      .insert(data)
      .returning<UserModel[]>('*');

    return user;
  }

  async findUserByDocument(document: string): Promise<UserModel> {
    const [user] = await knex(this.knexConfig)
      .table(this.tableName)
      .select('*')
      .where({ document })
      .returning<UserModel[]>('*');

    return user;
  }
}
