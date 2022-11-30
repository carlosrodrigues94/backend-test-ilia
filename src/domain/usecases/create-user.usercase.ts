import { UserModel } from '../models/user';

export interface CreateUserUsecasePayload {
  name: string;
  document: string;
}

export interface CreateUserUsecase {
  execute(payload: CreateUserUsecasePayload): Promise<UserModel>;
}
