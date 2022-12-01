import { UserModel } from '@/domain/models';

export interface CreateUserRepository {
  createUser: (data: UserModel) => Promise<UserModel>;
}
