import { UserModel } from '@/domain/models/user';

export interface FindUserByDocumentRepository {
  findUserByDocument: (document: string) => Promise<UserModel>;
}
