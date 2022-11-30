import { UserModel } from '@/domain/models/user';

export interface CreateUserRepository {
  createUser: (data: UserModel) => Promise<UserModel>;
}
