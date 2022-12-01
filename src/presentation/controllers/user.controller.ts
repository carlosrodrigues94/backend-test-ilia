import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserUsecase } from '@/domain/usecases';
import { CreateUserUsecaseFactory } from '@/presentation/factories';
import { CreateUserDTO } from '@/presentation/dtos';

@Controller()
export class UserController {
  usecase: CreateUserUsecase;
  constructor(
    private readonly createUserUsecaseFactory: CreateUserUsecaseFactory,
  ) {
    this.usecase = this.createUserUsecaseFactory.build();
  }

  @Post('/users')
  async createUser(@Body() body: CreateUserDTO) {
    const result = await this.usecase.execute(body);
    return result;
  }
}
