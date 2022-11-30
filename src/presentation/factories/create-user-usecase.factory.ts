import { DbCreateUserUsercase } from '@/data/usecases/create-user.usercase';
import { KnexUserRepository } from '@/infra/repositories/knex-user.repository';
import { UuidService } from '@/infra/services/uuid.service';
import { ConfigService } from '@nestjs/config';
import { Knex } from 'knex';

export class CreateUserUsecaseFactory {
  constructor(private readonly configService: ConfigService) {}
  build() {
    const knexConfig = this.configService.get<Knex.Config>('knex');

    const userRepository = new KnexUserRepository(knexConfig);
    const uuidService = new UuidService();

    return new DbCreateUserUsercase(uuidService, userRepository);
  }
}
