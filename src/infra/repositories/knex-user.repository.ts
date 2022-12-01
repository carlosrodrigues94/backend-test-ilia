import {
  CreateUserRepository,
  FindUserByDocumentRepository,
  FindUserByIdRepository,
} from '@/data/repositories/user';
import { UserModel } from '@/domain/models';
import { Knex, knex } from 'knex';

type Repository = CreateUserRepository &
  FindUserByDocumentRepository &
  FindUserByIdRepository;

export class KnexUserRepository implements Repository {
  protected tableName = 'users';

  constructor(private readonly knexConfig: Knex.Config) {}
  async findUserById(id: string): Promise<UserModel> {
    const [user] = await knex(this.knexConfig)
      .table(this.tableName)
      .select('*')
      .where({ id })
      .returning<UserModel[]>('*');

    return user;
  }

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
