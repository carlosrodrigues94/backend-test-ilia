import { UserModel } from '@/domain/models';

export class CreateUserResponseDTO implements UserModel {
  id: string;
  name: string;
  document: string;
  createdAt: Date;
}
