import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '@/app.module';
import { v4 } from 'uuid';
import { ApplicationExceptionFilter } from '@/presentation/filters';

describe('AccountController (e2e)', () => {
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

  describe('/accounts (POST)', () => {
    it('should create a account with success', async () => {
      const server = app.getHttpServer();

      const { body: user } = await request(server).post('/users').send({
        name: 'John Doe',
        document: Math.random().toString(),
      });

      const response = await request(server).post('/accounts').send({
        userId: user.id,
        balance: 1000,
      });

      expect(response.body).toHaveProperty('id');
      expect(response.body).toHaveProperty('balance');
      expect(response.body).toHaveProperty('userId');
      expect(response.body).toHaveProperty('createdAt');
      expect(response.body).toHaveProperty('updatedAt');
    });

    it('should get an error if user does not exists', async () => {
      const server = app.getHttpServer();

      const response = await request(server).post('/accounts').send({
        userId: v4(),
        balance: 1000,
      });

      expect(response.statusCode).toEqual(400);
    });

    it('should get the account balance', async () => {
      const server = app.getHttpServer();

      const { body: user } = await request(server).post('/users').send({
        name: 'John Doe',
        document: Math.random().toString(),
      });

      const { body: account } = await request(server).post('/accounts').send({
        userId: user.id,
        balance: 1000,
      });

      const response = await request(server).get(
        `/accounts/${account.id}/balance`,
      );

      expect(response.statusCode).toEqual(200);
      expect(response.body).toHaveProperty('id');
      expect(response.body).toHaveProperty('balance');
    });

    it('should get the account statement', async () => {
      const server = app.getHttpServer();

      const { body: user } = await request(server).post('/users').send({
        name: 'John Doe',
        document: Math.random().toString(),
      });

      const { body: account } = await request(server).post('/accounts').send({
        userId: user.id,
        balance: 1000,
      });

      const response = await request(server).get(
        `/accounts/${account.id}/statement`,
      );

      expect(response.statusCode).toEqual(200);
      expect(response.body.transfers).toEqual([]);
      expect(response.body.deposits).toEqual([]);
      expect(response.body).toHaveProperty('id');
      expect(response.body).toHaveProperty('balance');
      expect(response.body).toHaveProperty('userId');
      expect(response.body).toHaveProperty('createdAt');
      expect(response.body).toHaveProperty('updatedAt');
    });
  });
});
