import { ConfigService } from '@nestjs/config';
import { Knex } from 'knex';
import { DbGetAccountStatementUsecase } from '@/data/usecases';
import { KnexAccountRepository } from '@/infra/repositories';

export class GetAccountStatementUsecaseFactory {
  constructor(private readonly configService: ConfigService) {}
  build() {
    const knexConfig = this.configService.get<Knex.Config>('knex');

    const accountRepository = new KnexAccountRepository(knexConfig);

    return new DbGetAccountStatementUsecase(accountRepository);
  }
}
