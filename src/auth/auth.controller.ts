import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AdminGuard, Public } from './admin.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto) {
    return this.authService.signIn(signInDto.username, signInDto.password);
  }

  @UseGuards(AdminGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return 'hehe profile';
  }
}
