import { Module } from '@nestjs/common';
import { DepositController, UserController } from '@/presentation/controllers';
import {
  CreateUserUsecaseFactory,
  MakeDepositUsecaseFactory,
} from '@/presentation/factories';
import { knexConfig } from '@/config/knex.config';
import { ConfigModule, ConfigService } from '@nestjs/config';
@Module({
  imports: [ConfigModule.forRoot({ load: [knexConfig], isGlobal: true })],

  controllers: [DepositController, UserController],
  providers: [
    {
      provide: MakeDepositUsecaseFactory,
      inject: [ConfigService],
      useFactory: (configService) => {
        return new MakeDepositUsecaseFactory(configService);
      },
    },
    {
      provide: CreateUserUsecaseFactory,
      inject: [ConfigService],
      useFactory: (configService) => {
        return new CreateUserUsecaseFactory(configService);
      },
    },
  ],
})
export class AppModule {}
