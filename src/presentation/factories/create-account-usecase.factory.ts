import { ConfigService } from '@nestjs/config';
import { Knex } from 'knex';
import { DbCreateAccountUsecase } from '@/data/usecases';
import {
  KnexAccountRepository,
  KnexUserRepository,
} from '@/infra/repositories';
import { UuidService } from '@/infra/services/uuid.service';

export class CreateAccountUsecaseFactory {
  constructor(private readonly configService: ConfigService) {}
  build() {
    const knexConfig = this.configService.get<Knex.Config>('knex');

    const userRepository = new KnexUserRepository(knexConfig);
    const accountRepository = new KnexAccountRepository(knexConfig);

    const uuidService = new UuidService();

    return new DbCreateAccountUsecase(
      uuidService,
      accountRepository,
      userRepository,
    );
  }
}
