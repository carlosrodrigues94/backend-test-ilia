import { Module } from '@nestjs/common';
import { DepositController } from '@/presentation/controllers';
import { MakeDepositUsecaseFactory } from '@/presentation/factories';
import { knexConfig } from '@/config/knex.config';
import { ConfigModule, ConfigService } from '@nestjs/config';
@Module({
  imports: [ConfigModule.forRoot({ load: [knexConfig], isGlobal: true })],

  controllers: [DepositController],
  providers: [
    {
      provide: MakeDepositUsecaseFactory,
      inject: [ConfigService],
      useFactory: (configService) => {
        return new MakeDepositUsecaseFactory(configService);
      },
    },
  ],
})
export class AppModule {}
