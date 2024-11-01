import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { CategoryModule } from './category/category.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

import { MongooseModule } from '@nestjs/mongoose';
import { ImageModule } from './image/image.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './auth/constant';
import { APP_GUARD } from '@nestjs/core';
import { AdminGuard } from './auth/admin.guard';
import { OrderModule } from './order/order.module';
import { ConfigModule } from '@nestjs/config';
import { SearchModule } from './search/search.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env', // Path to the .env file
      isGlobal: true, // Make config globally available
    }),
    JwtModule.register({
      secret: jwtConstants.secret,
    }),
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/giadunghiendai'),
    ProductModule,
    CategoryModule,
    AuthModule,
    UsersModule,
    ImageModule,
    OrderModule,
    SearchModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AdminGuard,
    },
  ],
})
export class AppModule {}
