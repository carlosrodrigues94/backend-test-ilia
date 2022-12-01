import { UserModel } from '@/domain/models';

export interface FindUserByDocumentRepository {
  findUserByDocument: (document: string) => Promise<UserModel>;
}
