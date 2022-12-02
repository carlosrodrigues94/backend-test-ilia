import { Body, Controller, Post } from '@nestjs/common';
import { MakeWithdrawalUsecaseFactory } from '@/presentation/factories';
import { MakeWithdrawalUsecase } from '@/domain/usecases';
import {
  MakeWithdrawalDTO,
  MakeWithdrawalResponseDTO,
} from '@/presentation/dtos';
import { ApiResponse } from '@nestjs/swagger';

@Controller()
export class WithdrawalController {
  usecase: MakeWithdrawalUsecase;
  constructor(
    private readonly makeWithdrawalUsecaseFactory: MakeWithdrawalUsecaseFactory,
  ) {
    this.usecase = this.makeWithdrawalUsecaseFactory.build();
  }

  @ApiResponse({
    type: MakeWithdrawalResponseDTO,
    status: 201,
  })
  @Post('/withdrawals')
  async makeWithdrawal(@Body() body: MakeWithdrawalDTO) {
    const result = await this.usecase.execute(body);
    return result;
  }
}
