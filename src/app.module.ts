import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ProductModule } from './product/product.module';
import { UserModule } from './user/user.module';
import { MeasurementUnitModule } from './measurement-unit/measurement-unit.module';
import { PurchasedProductModule } from './purchased-product/purchased-product.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`.env`],
      cache: true,
    }),
    PrismaModule,
    ProductModule,
    MeasurementUnitModule,
    PurchasedProductModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
