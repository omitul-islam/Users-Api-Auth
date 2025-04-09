import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AdminController, AuthController } from './auth.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([User]),
  ],
  providers: [AuthService, JwtService],
  controllers: [AuthController, AdminController]
})
export class AuthModule {}
