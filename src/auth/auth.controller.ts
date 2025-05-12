import { Controller, Post, Body, Get, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Role, User } from './entities/user.entity';
import { Request } from 'express';
import { AdminGuard } from './guard/admin.guard';
import { UserGuard } from './guard/user.guard';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register as a User' })
    @ApiBody({
    schema: {
      example: {
        username: 'User',
        email: 'User@gmail.com',
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
  @ApiOperation({ summary: 'Login a user' })
  @ApiBody({
    schema: {
      example:{
         email: "User@gmail.com",
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

@ApiTags("Admin")
@Controller('admin') 
@UseGuards(AdminGuard)
export class AdminController {
    constructor(private readonly authService: AuthService) {}
    
    @Get('data')
    @ApiOperation({summary:"Get data for an Admin"})
    @ApiBearerAuth('access-token')
    async getAdminData(@Req() request: Request) {
        return this.authService.getAdminData(request);  
    }

}

@ApiTags("User")
@Controller('user') 
@UseGuards(UserGuard)
export class UserController {
    constructor(private readonly authService: AuthService) {}
    
    @Get('data')
    @ApiOperation({summary:"Get data for a regular User"})
    @ApiBearerAuth('access-token')

    async getUserData(@Req() request: Request) {
        return this.authService.getUserData(request);  
    }

}