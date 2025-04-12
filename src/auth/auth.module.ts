import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AdminController, AuthController, UserController } from './auth.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { JwtUtilsService } from './jwt.utils';

@Module({
  imports:[
    TypeOrmModule.forFeature([User]),
  ],
  providers: [AuthService, JwtService, JwtUtilsService],
  controllers: [AuthController, AdminController, UserController]
})
export class AuthModule {}
