import { Controller, Post, Body, Get, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Role } from './entities/user.entity';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(
    @Body('id') id: number,
    @Body('username') username: string,
    @Body('email') email: string,
    @Body('age') age: number,
    @Body('password') password: string,
    @Body('role') role: Role,
  ) {
    return this.authService.register(id, username, email,age, password, role);
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
export class AdminController {
    constructor(private readonly authService: AuthService) {}
    
    @Get('data')
    // will use guard here, later
    async getAdminData(@Req() request: Request) {
        return this.authService.getAdminData(request);  
    }

}