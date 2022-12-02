import { AccountModel } from '@/domain/models';

export class AccountStatement extends AccountModel {
  transfers: Array<{
    id: string;
    amount: number;
    recipientAccountId: string;
    createdAt: Date;
  }>;
  deposits: Array<{ id: string; amount: number; createdAt: Date }>;
}
