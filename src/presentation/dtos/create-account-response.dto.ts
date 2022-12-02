import { AccountModel } from '@/domain/models';

export class CreateAccountResponseDTO implements AccountModel {
  id: string;
  userId: string;
  balance: number;
  updatedAt?: Date;
  createdAt: Date;
}
