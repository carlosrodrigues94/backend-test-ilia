import { Body, Controller, Post } from '@nestjs/common';
import { TransferAmountUsecaseFactory } from '@/presentation/factories';
import { TransferAmountUsecase } from '@/domain/usecases';
import {
  TransferAmountDTO,
  TransferAmountResponseDTO,
} from '@/presentation/dtos';
import { ApiResponse } from '@nestjs/swagger';

@Controller()
export class TransferAmountController {
  usecase: TransferAmountUsecase;
  constructor(
    private readonly makeTransferAmountUsecaseFactory: TransferAmountUsecaseFactory,
  ) {
    this.usecase = this.makeTransferAmountUsecaseFactory.build();
  }

  @ApiResponse({
    type: TransferAmountResponseDTO,
    status: 201,
  })
  @Post('/transfers')
  async transferAmount(@Body() body: TransferAmountDTO) {
    const result = await this.usecase.execute(body);
    return result;
  }
}
