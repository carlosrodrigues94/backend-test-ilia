import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import {
  CreateAccountUsecase,
  GetAccountBalanceUsecase,
  GetAccountStatementUsecase,
} from '@/domain/usecases';
import {
  CreateAccountUsecaseFactory,
  GetAccountBalanceUsecaseFactory,
  GetAccountStatementUsecaseFactory,
} from '@/presentation/factories';
import { CreateAccountDTO } from '@/presentation/dtos';

@Controller()
export class AccountController {
  createAccountUsecase: CreateAccountUsecase;
  getAccountStatementUsecase: GetAccountStatementUsecase;
  getAccountBalanceUsecase: GetAccountBalanceUsecase;
  constructor(
    private readonly createAccountUsecaseFactory: CreateAccountUsecaseFactory,
    private readonly getAccountStatementUsecaseFactory: GetAccountStatementUsecaseFactory,
    private readonly getAccountBalanceUsecaseFactory: GetAccountBalanceUsecaseFactory,
  ) {
    this.createAccountUsecase = this.createAccountUsecaseFactory.build();
    this.getAccountStatementUsecase =
      this.getAccountStatementUsecaseFactory.build();
    this.getAccountBalanceUsecase =
      this.getAccountBalanceUsecaseFactory.build();
  }

  @Post('/accounts')
  async createAccount(@Body() body: CreateAccountDTO) {
    const result = await this.createAccountUsecase.execute(body);
    return result;
  }

  @Get('/accounts/:id/statement')
  async getStatement(@Param('id') id: string) {
    const result = await this.getAccountStatementUsecase.execute({
      accountId: id,
    });
    return result;
  }

  @Get('/accounts/:id/balance')
  async getBalance(@Param('id') id: string) {
    const result = await this.getAccountBalanceUsecase.execute({
      accountId: id,
    });
    return result;
  }
}
