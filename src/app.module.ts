import { Module } from '@nestjs/common';
import { AppController } from '@/presentation/app.controller';
import { AppService } from '@/data/app.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
