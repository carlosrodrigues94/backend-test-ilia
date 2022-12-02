import { ConfigModule, ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import {
  AccountController,
  DepositController,
  TransferAmountController,
  UserController,
  WithdrawalController,
} from '@/presentation/controllers';
import {
  CreateAccountUsecaseFactory,
  CreateUserUsecaseFactory,
  GetAccountBalanceUsecaseFactory,
  GetAccountStatementUsecaseFactory,
  MakeDepositUsecaseFactory,
  MakeWithdrawalUsecaseFactory,
  TransferAmountUsecaseFactory,
} from '@/presentation/factories';
import { knexConfig } from '@/config/knex.config';
@Module({
  imports: [ConfigModule.forRoot({ load: [knexConfig], isGlobal: true })],

  controllers: [
    DepositController,
    UserController,
    AccountController,
    TransferAmountController,
    WithdrawalController,
  ],
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
    {
      provide: TransferAmountUsecaseFactory,
      inject: [ConfigService],
      useFactory: (configService) => {
        return new TransferAmountUsecaseFactory(configService);
      },
    },
    {
      provide: GetAccountStatementUsecaseFactory,
      inject: [ConfigService],
      useFactory: (configService) => {
        return new GetAccountStatementUsecaseFactory(configService);
      },
    },

    {
      provide: GetAccountBalanceUsecaseFactory,
      inject: [ConfigService],
      useFactory: (configService) => {
        return new GetAccountBalanceUsecaseFactory(configService);
      },
    },
    {
      provide: MakeWithdrawalUsecaseFactory,
      inject: [ConfigService],
      useFactory: (configService) => {
        return new MakeWithdrawalUsecaseFactory(configService);
      },
    },
  ],
})
export class AppModule {}
