import { Body, Controller, Post } from '@nestjs/common';
import { MakeDepositUsecaseFactory } from '@/presentation/factories';
import {
  MakeDepositUsecase,
  MakeDepositUsecasePayload,
} from '@/domain/usecases';

@Controller()
export class DepositController {
  usecase: MakeDepositUsecase;
  constructor(
    private readonly makeDepositUsecaseFactory: MakeDepositUsecaseFactory,
  ) {
    this.usecase = this.makeDepositUsecaseFactory.build();
  }

  @Post('/deposits')
  async makeDeposit(@Body() body: MakeDepositUsecasePayload) {
    const result = await this.usecase.execute(body);
    return result;
  }
}
