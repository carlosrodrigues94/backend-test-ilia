import { DepositModel } from '@/domain/models';

export class MakeDepositResponseDTO implements DepositModel {
  id: string;
  accountId: string;
  amount: number;
  createdAt: Date;
}
