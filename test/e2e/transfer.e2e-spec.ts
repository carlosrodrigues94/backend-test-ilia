import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '@/app.module';
import { ApplicationExceptionFilter } from '@/presentation/filters';

describe('Transfer Controller (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalFilters(new ApplicationExceptionFilter());
    await app.init();
  });

  afterEach(() => {
    app.close();
  });

  describe('/transfers (POST)', () => {
    it('should transfer amount with success', async () => {
      const server = app.getHttpServer();

      const { body: user } = await request(server).post('/users').send({
        name: 'John Doe',
        document: Math.random().toString(),
      });

      const { body: originAccount } = await request(server)
        .post('/accounts')
        .send({
          userId: user.id,
          balance: 1000,
        });

      const { body: recipientAccount } = await request(server)
        .post('/accounts')
        .send({
          userId: user.id,
          balance: 1000,
        });

      const response = await request(server).post('/transfers').send({
        originAccountId: originAccount.id,
        recipientAccountId: recipientAccount.id,
        amount: 40,
      });

      expect(response.body).toHaveProperty('id', response.body.id);
      expect(response.body).toHaveProperty('amount', 40);
      expect(response.body).toHaveProperty('createdAt');
      expect(response.body).toHaveProperty('originAccountId', originAccount.id);
      expect(response.body).toHaveProperty(
        'recipientAccountId',
        recipientAccount.id,
      );
    });
  });
});
