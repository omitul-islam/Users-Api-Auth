import { Controller, Post, Body, Get, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Role, User } from './entities/user.entity';
import { Request } from 'express';
import { AdminGuard } from './guard/admin.guard';
import { UserGuard } from './guard/user.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
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