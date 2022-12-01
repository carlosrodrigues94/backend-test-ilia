import { Body, Controller, Post } from '@nestjs/common';
import { CreateAccountUsecase } from '@/domain/usecases';
import { CreateAccountUsecaseFactory } from '@/presentation/factories';
import { CreateAccountDTO } from '@/presentation/dtos';

@Controller()
export class AccountController {
  usecase: CreateAccountUsecase;
  constructor(
    private readonly createAccountUsecaseFactory: CreateAccountUsecaseFactory,
  ) {
    this.usecase = this.createAccountUsecaseFactory.build();
  }

  @Post('/accounts')
  async createAccount(@Body() body: CreateAccountDTO) {
    const result = await this.usecase.execute(body);
    return result;
  }
}
