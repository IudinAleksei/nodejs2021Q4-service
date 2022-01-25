import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcrypt';
import { HASH_SALT } from 'src/constants';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { CreateAuthDto } from './dto/create-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(createAuthDto: CreateAuthDto) {
    const user = await this.userService.findByLogin(createAuthDto.login);
    if (
      user &&
      (await this.isPasswordValid(user.password, createAuthDto.password))
    ) {
      return { token: this.createToken(user) };
    }
    throw new ForbiddenException();
  }

  async getPasswordHash(password: string): Promise<string> {
    return hash(password, HASH_SALT);
  }

  async isPasswordValid(
    password: string,
    passwordHash: string,
  ): Promise<boolean> {
    return compare(password, passwordHash);
  }

  async createToken(user: User): Promise<string> {
    const payload = {
      userId: user.id,
      login: user.login,
    };
    return this.jwtService.sign(payload);
  }
}
