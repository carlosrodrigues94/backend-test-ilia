import { AccountStatement } from '@/domain/models';

class Transfer {
  id: string;
  amount: number;
  recipientAccountId: string;
  createdAt: Date;
}

class Deposit {
  id: string;
  amount: number;
  createdAt: Date;
}

export class GetAccountStatementResponseDTO implements AccountStatement {
  transfers: Transfer[];
  deposits: Deposit[];
  id: string;
  userId: string;
  balance: number;
  updatedAt?: Date;
  createdAt: Date;
}
