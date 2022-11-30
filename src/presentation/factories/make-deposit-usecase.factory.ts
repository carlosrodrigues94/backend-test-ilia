import { DbMakeDepositUsecase } from '@/data/usecases';
import { KnexAccountRepository } from '@/infra/repositories';
import { UuidService } from '@/infra/services/uuid.service';
import { ConfigService } from '@nestjs/config';
import { Knex } from 'knex';

export class MakeDepositUsecaseFactory {
  constructor(private readonly configService: ConfigService) {}
  build() {
    const knexConfig = this.configService.get<Knex.Config>('knex');

    const accountRepository = new KnexAccountRepository(knexConfig);
    const uuidService = new UuidService();

    return new DbMakeDepositUsecase(accountRepository, uuidService);
  }
}
