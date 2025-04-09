import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Role } from './entities/user.entity';

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
}