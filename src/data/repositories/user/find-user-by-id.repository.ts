import { UserModel } from '@/domain/models';

export interface FindUserByIdRepository {
  findUserById: (id: string) => Promise<UserModel>;
}
