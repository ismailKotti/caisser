import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const user = await this.usersService.findByEmailForAuth(loginDto.email);
    if (!user) {
      throw new UnauthorizedException('Email ou mot de passe incorrect.');
    }

    if (typeof user.pass !== 'string') {
      throw new UnauthorizedException('Email ou mot de passe incorrect.');
    }

    const isPasswordValid = await bcrypt.compare(loginDto.pass, user.pass);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Email ou mot de passe incorrect.');
    }

    const payload = {
      sub: user.id_user,
      email: user.email,
      role: user.role.type_role,
    };

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id_user,
        email: user.email,
        role: user.role.type_role,
      },
    };
  }
}