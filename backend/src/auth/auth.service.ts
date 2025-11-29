import { Injectable, UnauthorizedException, ConflictException, Logger } from '@nestjs/common';
import type { Response } from 'express';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signup.dto';
import { LogInDto } from './dto/login.dto';
import bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) { }

  async signup(dto: SignUpDto, res: Response) {
    const { email, name, password } = dto;

    this.logger.log(`Signup attempt for email: ${this.maskEmail(email)}`);

    const existing = await this.usersService.findByEmail(email);
    if (existing) {
      this.logger.warn(`Signup failed: Email already exists - ${this.maskEmail(email)}`);
      throw new ConflictException('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.usersService.create(email, name, hashedPassword);

    const token = this.jwtService.sign({ sub: user._id, email: user.email });

    this.setCookies(res, token);

    const { password: _, ...safeUser } = user.toObject();

    this.logger.log(`User created successfully: ${this.maskEmail(email)}`);
    return { message: 'User created successfully', safeUser };
  }

  async login(dto: LogInDto, res: Response) {
    const { email, password } = dto;

    this.logger.log(`Login attempt for email: ${this.maskEmail(email)}`);

    const user = await this.usersService.findByEmail(email);
    if (!user) {
      this.logger.warn(`Login failed: User not found - ${this.maskEmail(email)}`);
      throw new UnauthorizedException('Invalid credentials');
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      this.logger.warn(`Login failed: Invalid password - ${this.maskEmail(email)}`);
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = this.jwtService.sign({ sub: user._id, email: user.email });

    this.setCookies(res, token);

    const userObj = user.toObject ? user.toObject() : user;
    const { password: _, ...safeUser } = userObj;

    this.logger.log(`User logged in successfully: ${this.maskEmail(email)}`);
    return { message: 'Logged in successfully', safeUser };
  }

  async logout(res: Response) {
    this.logger.log('Logout request received');
    res.clearCookie('token');
    return { message: 'Logged out successfully' };
  }

  private setCookies(res: Response, accessToken: string) {
    const isProd = process.env.NODE_ENV === 'production';

    res.cookie('token', accessToken, {
      httpOnly: true,
      secure: isProd,
      sameSite: 'strict',
      maxAge: 3600000
    });
  }

  private maskEmail(email: string): string {
    const [local, domain] = email.split('@');
    if (!domain) return email;
    const maskedLocal = local.length > 2 ? `${local.slice(0, 2)}***` : `${local}***`;
    return `${maskedLocal}@${domain}`;
  }
}
