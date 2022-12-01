import { ConfigModule, ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import {
  AccountController,
  DepositController,
  UserController,
} from '@/presentation/controllers';
import {
  CreateAccountUsecaseFactory,
  CreateUserUsecaseFactory,
  MakeDepositUsecaseFactory,
} from '@/presentation/factories';
import { knexConfig } from '@/config/knex.config';
@Module({
  imports: [ConfigModule.forRoot({ load: [knexConfig], isGlobal: true })],

  controllers: [DepositController, UserController, AccountController],
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

    {
      provide: CreateAccountUsecaseFactory,
      inject: [ConfigService],
      useFactory: (configService) => {
        return new CreateAccountUsecaseFactory(configService);
      },
    },
  ],
})
export class AppModule {}
