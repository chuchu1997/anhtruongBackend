import { Module } from '@nestjs/common';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';

import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/auth/constant';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from 'src/schemas/product.schema';
import { ProductService } from 'src/product/product.service';

@Module({
  imports: [
    JwtModule.register({
      secret: jwtConstants.secret,
    }),

    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
  ],
  controllers: [SearchController],
  providers: [SearchService],
})
export class SearchModule {}
