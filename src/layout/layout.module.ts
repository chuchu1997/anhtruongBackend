import { Module } from '@nestjs/common';
import { LayoutService } from './layout.service';
import { LayoutController } from './layout.controller';
import { UsersModule } from 'src/users/users.module';
import { AuthModule } from 'src/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/auth/constant';
import { MongooseModule } from '@nestjs/mongoose';
import { BannerSchema, Banner } from 'src/schemas/banner.schema';

@Module({
  imports: [
    // UsersModule,
    // AuthModule,
    // JwtModule.register({
    //   secret: jwtConstants.secret,
    // }),
    MongooseModule.forFeature([{ name: Banner.name, schema: BannerSchema }]),
  ],
  controllers: [LayoutController],
  providers: [LayoutService],
})
export class LayoutModule {}
