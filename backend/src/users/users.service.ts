import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
  ) { }

  async create(email: string, name: string, password: string) {
    this.logger.log(`Creating user: ${this.maskEmail(email)}`);
    return this.userModel.create({ email, name, password });
  }

  async findByEmail(email: string) {
    this.logger.log(`Looking up user by email: ${this.maskEmail(email)}`);
    return this.userModel.findOne({ email }).lean().exec();
  }

  async findById(id: any) {
    return this.userModel.findById(id).lean().exec();
  }

  private maskEmail(email: string): string {
    const [local, domain] = email.split('@');
    if (!domain) return email;
    const maskedLocal = local.length > 2 ? `${local.slice(0, 2)}***` : `${local}***`;
    return `${maskedLocal}@${domain}`;
  }
}
