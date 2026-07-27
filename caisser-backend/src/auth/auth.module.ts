import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      global: true,
      secret:
        process.env.JWT_SECRET ||
        'ma_cle_secrete_hyper_difficile_a_deviner_1234!',
      signOptions: { expiresIn: '12h' }, // Le caissier reste connecté pendant sa rotation de 12h
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
