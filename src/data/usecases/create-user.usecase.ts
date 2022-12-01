import { UserModel } from '@/domain/models';
import { CreateUserUsecase, CreateUserUsecasePayload } from '@/domain/usecases';

import {
  CreateUserRepository,
  FindUserByDocumentRepository,
} from '@/data/repositories/user';

import { UniqueIdService } from '@/data/services';
import { ApplicationException } from '@/data/exceptions';

export class DbCreateUserUsecase implements CreateUserUsecase {
  constructor(
    private readonly uniqueIdService: UniqueIdService,
    private readonly userRepository: CreateUserRepository &
      FindUserByDocumentRepository,
  ) {}
  async execute(payload: CreateUserUsecasePayload): Promise<UserModel> {
    const userExists = await this.userRepository.findUserByDocument(
      payload.document,
    );

    if (userExists) {
      throw new ApplicationException('This user already exists', 400);
    }

    const data: UserModel = {
      id: this.uniqueIdService.generateUniqueId(),
      name: payload.name,
      document: payload.document,
      createdAt: new Date(),
    };

    const user = await this.userRepository.createUser(data);

    return user;
  }
}
