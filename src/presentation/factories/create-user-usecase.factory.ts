import { ConfigService } from '@nestjs/config';
import { Knex } from 'knex';
import { DbCreateUserUsecase } from '@/data/usecases';
import { KnexUserRepository } from '@/infra/repositories';
import { UuidService } from '@/infra/services/uuid.service';

export class CreateUserUsecaseFactory {
  constructor(private readonly configService: ConfigService) {}
  build() {
    const knexConfig = this.configService.get<Knex.Config>('knex');

    const userRepository = new KnexUserRepository(knexConfig);
    const uuidService = new UuidService();

    return new DbCreateUserUsecase(uuidService, userRepository);
  }
}
