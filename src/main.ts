import { NestFactory } from '@nestjs/core';
import { AppModule } from '@/app.module';
import { ApplicationExceptionFilter } from '@/presentation/filters';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new ApplicationExceptionFilter());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Backend Test Ilia')
    .setDescription('Bank Account')
    .setVersion('1.0')
    .addTag('bank')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
