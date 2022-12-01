import { ConfigService } from '@nestjs/config';
import { Knex } from 'knex';
import { DbTransferAmountUsecase } from '@/data/usecases';
import {
  KnexAccountRepository,
  KnexTransferRepository,
} from '@/infra/repositories';
import { UuidService } from '@/infra/services';

export class TransferAmountUsecaseFactory {
  constructor(private readonly configService: ConfigService) {}
  build() {
    const knexConfig = this.configService.get<Knex.Config>('knex');

    const accountRepository = new KnexAccountRepository(knexConfig);
    const transferRepository = new KnexTransferRepository(knexConfig);
    const uuidService = new UuidService();

    return new DbTransferAmountUsecase(
      accountRepository,
      transferRepository,
      uuidService,
    );
  }
}
