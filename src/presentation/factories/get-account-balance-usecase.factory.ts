import { ConfigService } from '@nestjs/config';
import { Knex } from 'knex';
import { DbGetAccountBalanceUsecase } from '@/data/usecases';
import { KnexAccountRepository } from '@/infra/repositories';

export class GetAccountBalanceUsecaseFactory {
  constructor(private readonly configService: ConfigService) {}
  build() {
    const knexConfig = this.configService.get<Knex.Config>('knex');

    const accountRepository = new KnexAccountRepository(knexConfig);

    return new DbGetAccountBalanceUsecase(accountRepository);
  }
}
