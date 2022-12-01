import { AccountModel } from '@/domain/models';

export interface CreateAccountUsecasePayload {
  userId: string;
  balance: number;
}

export interface CreateAccountUsecase {
  execute(payload: CreateAccountUsecasePayload): Promise<AccountModel>;
}
