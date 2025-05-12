import { Controller, Post, Body, Get, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Role, User } from './entities/user.entity';
import { Request } from 'express';
import { AdminGuard } from './guard/admin.guard';
import { UserGuard } from './guard/user.guard';
import { ApiBody } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
    @ApiBody({
    schema: {
      example: {
        username: 'User',
        email: 'User@example.com',
        password: '123456',
        age: 30,
      },
    },
  })
  async register(
    @Body() userData:User
  ) {
    return this.authService.register(userData.id,
      userData.username,
      userData.email,
      userData.age,
      userData.password);
  }

  @Post('login')
  @ApiBody({
    schema: {
      example:{
         email: "user@gmail.com",
         password:"********"
      }
    }
  })
  async login(
    @Body('email') email:string,
    @Body('password') password: string
  ){
    return this.authService.login(email, password);
  }
}

@Controller('admin') 
@UseGuards(AdminGuard)
export class AdminController {
    constructor(private readonly authService: AuthService) {}
    
    @Get('data')
    async getAdminData(@Req() request: Request) {
        return this.authService.getAdminData(request);  
    }

}

@Controller('user') 
@UseGuards(UserGuard)
export class UserController {
    constructor(private readonly authService: AuthService) {}
    
    @Get('data')
    // will use guard here, later
    async getAdminData(@Req() request: Request) {
        return this.authService.getAdminData(request);  
    }

}