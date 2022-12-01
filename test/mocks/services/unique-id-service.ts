import { UniqueIdService } from '@/data/services';

export const uniqueIdServiceMock: UniqueIdService = {
  generateUniqueId: jest.fn(() => 'uuid'),
};
