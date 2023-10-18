import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NinjasModule } from './ninjas/ninjas.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot(),
    NinjasModule,
    MongooseModule.forRoot(process.env.mongoURI),
    // liveraging the cache module to be used everywhere instead of importing it in every module 
    CacheModule.register({ isGlobal:true }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
