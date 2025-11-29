import {
  Controller,
  Post,
  Body,
  Res,
  Req,
  Get,
  UseGuards,
  Logger,
} from '@nestjs/common';
import type { Request, Response } from 'express';
import { SignUpDto } from './dto/signup.dto';
import { LogInDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { JwtGuard } from './guards/jwt.guard';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(private readonly authService: AuthService) { }

  @Post('signup')
  async signup(
    @Body() dto: SignUpDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    this.logger.log('POST /auth/signup');
    return this.authService.signup(dto, res);
  }

  @Post('login')
  async login(
    @Body() dto: LogInDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    this.logger.log('POST /auth/login');
    return this.authService.login(dto, res);
  }

  @Post('logout')
  async logout(@Res({ passthrough: true }) res: Response) {
    this.logger.log('POST /auth/logout');
    return this.authService.logout(res);
  }

  @Get('homepage')
  @UseGuards(JwtGuard)
  getHomepage(@Req() req: any) {
    this.logger.log('GET /auth/homepage');
    const user = req.user;
    const userObj = user.toObject ? user.toObject() : user;
    const { password, ...safeUser } = userObj;

    return {
      user: safeUser,
    };
  }
}
