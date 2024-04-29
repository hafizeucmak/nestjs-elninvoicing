import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { ElninvoiceModule } from './eInvoice-functions/sendInvoiceFunction.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({ isGlobal: true }),
    // MongooseModule.forRoot(process.env.MONGO_URL, {
    //   dbName: process.env.MONGO_DB_NAME,
    //   user: process.env.MONGO_USER,
    //   pass: process.env.MONGO_PASSWORD,
    //   readPreference: 'secondaryPreferred'
    // }),
    ElninvoiceModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
