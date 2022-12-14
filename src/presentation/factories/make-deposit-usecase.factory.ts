import { ConfigService } from '@nestjs/config';
import { Knex } from 'knex';
import { DbMakeDepositUsecase } from '@/data/usecases';
import {
  KnexAccountRepository,
  KnexDepositRepository,
} from '@/infra/repositories';
import { UuidService } from '@/infra/services/uuid.service';

export class MakeDepositUsecaseFactory {
  constructor(private readonly configService: ConfigService) {}
  build() {
    const knexConfig = this.configService.get<Knex.Config>('knex');

    const accountRepository = new KnexAccountRepository(knexConfig);
    const depositRepository = new KnexDepositRepository(knexConfig);
    const uuidService = new UuidService();

    return new DbMakeDepositUsecase(
      accountRepository,
      depositRepository,
      uuidService,
    );
  }
}
