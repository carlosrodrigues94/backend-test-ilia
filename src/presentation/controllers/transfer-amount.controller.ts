import { Body, Controller, Post } from '@nestjs/common';
import { TransferAmountUsecaseFactory } from '@/presentation/factories';
import { TransferAmountUsecase } from '@/domain/usecases';
import { TransferAmountDTO } from '@/presentation/dtos';

@Controller()
export class TransferAmountController {
  usecase: TransferAmountUsecase;
  constructor(
    private readonly makeTransferAmountUsecaseFactory: TransferAmountUsecaseFactory,
  ) {
    this.usecase = this.makeTransferAmountUsecaseFactory.build();
  }

  @Post('/transfer')
  async transferAmount(@Body() body: TransferAmountDTO) {
    const result = await this.usecase.execute(body);
    return result;
  }
}
