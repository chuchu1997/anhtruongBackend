import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { UsersModule } from 'src/users/users.module';
import { AuthModule } from 'src/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/auth/constant';
import { MongooseModule } from '@nestjs/mongoose';
import { Category, CategorySchema } from 'src/schemas/category.schema';
import { AuthService } from 'src/auth/auth.service';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    JwtModule.register({
      secret: jwtConstants.secret,
    }),
    MongooseModule.forFeature([
      { name: Category.name, schema: CategorySchema },
    ]),
  ],
  controllers: [CategoryController],
  providers: [CategoryService, AuthService],
})
export class CategoryModule {}
