import { AccountModel } from '@/domain/models';

import {
  CreateAccountUsecase,
  CreateAccountUsecasePayload,
} from '@/domain/usecases';

import { UniqueIdService } from '@/data/services';
import { ApplicationException } from '@/data/exceptions';
import { FindUserByIdRepository } from '@/data/repositories/user';
import { CreateAccountRepository } from '@/data/repositories/account';

export class DbCreateAccountUsecase implements CreateAccountUsecase {
  constructor(
    private readonly uniqueIdService: UniqueIdService,
    private readonly accountRepository: CreateAccountRepository,
    private readonly userRepository: FindUserByIdRepository,
  ) {}
  async execute(payload: CreateAccountUsecasePayload): Promise<AccountModel> {
    const userExists = await this.userRepository.findUserById(payload.userId);

    if (!userExists) {
      throw new ApplicationException(
        'This userId is invalid because not exists',
        400,
      );
    }

    const data: AccountModel = {
      id: this.uniqueIdService.generateUniqueId(),
      balance: payload.balance,
      userId: payload.userId,
      createdAt: new Date(),
    };

    const account = await this.accountRepository.createAccount(data);

    return account;
  }
}
