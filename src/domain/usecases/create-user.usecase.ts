import { UserModel } from '@/domain/models';

export interface CreateUserUsecasePayload {
  name: string;
  document: string;
}

export interface CreateUserUsecase {
  execute(payload: CreateUserUsecasePayload): Promise<UserModel>;
}
