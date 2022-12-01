import { UserModel } from '@/domain/models';

export const userMock: UserModel = {
  id: 'uuid',
  createdAt: new Date(),
  document: '123456',
  name: 'user',
};
