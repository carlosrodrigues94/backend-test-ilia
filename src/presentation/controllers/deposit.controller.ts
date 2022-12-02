import { Body, Controller, Post } from '@nestjs/common';
import { MakeDepositUsecaseFactory } from '@/presentation/factories';
import { MakeDepositUsecase } from '@/domain/usecases';
import { MakeDepositDTO, MakeDepositResponseDTO } from '@/presentation/dtos';
import { ApiResponse } from '@nestjs/swagger';

@Controller()
export class DepositController {
  usecase: MakeDepositUsecase;
  constructor(
    private readonly makeDepositUsecaseFactory: MakeDepositUsecaseFactory,
  ) {
    this.usecase = this.makeDepositUsecaseFactory.build();
  }

  @ApiResponse({
    type: MakeDepositResponseDTO,
    status: 201,
  })
  @Post('/deposits')
  async makeDeposit(@Body() body: MakeDepositDTO) {
    const result = await this.usecase.execute(body);
    return result;
  }
}
