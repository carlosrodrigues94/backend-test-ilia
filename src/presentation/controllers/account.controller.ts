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
import {
  CreateAccountDTO,
  CreateAccountResponseDTO,
  GetAccountStatementResponseDTO,
} from '@/presentation/dtos';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import { GetAccountBalanceResponseDTO } from '../dtos/get-account-balance-response.dto';

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

  @ApiBody({
    type: CreateAccountDTO,
  })
  @ApiResponse({
    type: CreateAccountResponseDTO,
    status: 201,
  })
  @Post('/accounts')
  async createAccount(@Body() body: CreateAccountDTO) {
    const result = await this.createAccountUsecase.execute(body);
    return result;
  }

  @ApiResponse({
    type: GetAccountStatementResponseDTO,
    status: 200,
  })
  @Get('/accounts/:id/statement')
  async getStatement(@Param('id') id: string) {
    const result = await this.getAccountStatementUsecase.execute({
      accountId: id,
    });
    return result;
  }

  @ApiResponse({
    type: GetAccountBalanceResponseDTO,
    status: 200,
  })
  @Get('/accounts/:id/balance')
  async getBalance(@Param('id') id: string) {
    const result = await this.getAccountBalanceUsecase.execute({
      accountId: id,
    });
    return result;
  }
}
