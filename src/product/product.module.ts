import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from 'src/auth/auth.service';
import { AuthModule } from 'src/auth/auth.module';
import { jwtConstants } from 'src/auth/constant';
import { extname } from 'path';

import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { Product, ProductSchema } from 'src/schemas/product.schema';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Category, CategorySchema } from 'src/schemas/category.schema';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    JwtModule.register({
      secret: jwtConstants.secret,
    }),

    MongooseModule.forFeature([
      { name: Product.name, schema: ProductSchema },
      { name: Category.name, schema: CategorySchema },
    ]),
  ],
  controllers: [ProductController],
  providers: [ProductService, AuthService],
  exports: [ProductService],
})
export class ProductModule {}
