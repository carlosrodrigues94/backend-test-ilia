import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserUsecase } from '@/domain/usecases';
import { CreateUserUsecaseFactory } from '@/presentation/factories';
import { CreateUserDTO, CreateUserResponseDTO } from '@/presentation/dtos';
import { ApiResponse } from '@nestjs/swagger';

@Controller()
export class UserController {
  usecase: CreateUserUsecase;
  constructor(
    private readonly createUserUsecaseFactory: CreateUserUsecaseFactory,
  ) {
    this.usecase = this.createUserUsecaseFactory.build();
  }

  @ApiResponse({
    type: CreateUserResponseDTO,
    status: 201,
  })
  @Post('/users')
  async createUser(@Body() body: CreateUserDTO) {
    const result = await this.usecase.execute(body);
    return result;
  }
}
