import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { IJWTPayload } from './auth.types';
import { CreateAuthDto } from './dto/create-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(createAuthDto: CreateAuthDto) {
    // const user = await this.userService.findByLogin(createAuthDto.login);
    // if (user && (await compare(createAuthDto.password, user.password))) {
    //   return { token: await this.createToken(user) };
    // }
    throw new ForbiddenException();
  }

  async createToken(user: User): Promise<string> {
    const payload: IJWTPayload = {
      userId: user.id,
      login: user.login,
    };
    return this.jwtService.sign(payload);
  }
}
