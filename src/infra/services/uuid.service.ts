import { UniqueIdService } from '@/data/services';
import { v4 as uuid } from 'uuid';

export class UuidService implements UniqueIdService {
  generateUniqueId() {
    return uuid();
  }
}
