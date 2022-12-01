import { ConfigService } from '@nestjs/config';
import { Knex } from 'knex';
import { DbMakeWithdrawalUsecase } from '@/data/usecases';
import {
  KnexAccountRepository,
  KnexWithdrawalRepository,
} from '@/infra/repositories';
import { UuidService } from '@/infra/services/uuid.service';

export class MakeWithdrawalUsecaseFactory {
  constructor(private readonly configService: ConfigService) {}
  build() {
    const knexConfig = this.configService.get<Knex.Config>('knex');

    const accountRepository = new KnexAccountRepository(knexConfig);
    const withdrawalRepository = new KnexWithdrawalRepository(knexConfig);
    const uuidService = new UuidService();

    return new DbMakeWithdrawalUsecase(
      accountRepository,
      withdrawalRepository,
      uuidService,
    );
  }
}
