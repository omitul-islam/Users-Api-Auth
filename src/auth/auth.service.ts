import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Role, User } from './entities/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async register(id:number, username: string, email: string, age: number, password: string, role: Role) {
    const userExists = await this.userRepository.findOneBy({ email });
    if (userExists) {
      throw new BadRequestException('This User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = this.userRepository.create({
      id,
      username,
      email,
      age,
      password: hashedPassword,
      role,
    });

    await this.userRepository.save(newUser);
    const {password: _password, ...result} = newUser;
    return { message: 'User is registered successfully', User: result };
  }
  
  async login(email: string, password: string) {
    const user = await this.userRepository.findOneBy({email});
    if(!user) {
        throw new BadRequestException('Invalid User! Please Get Registered first');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if(!isPasswordValid) {
       throw new BadRequestException('Wrong Password!'); 
    }

    const payload = {id: user.id, email: user.email};
    const token = this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET,
        expiresIn: process.env.JWT_EXPIRATION
    });
    return {message: 'Successfully logged in!', your_token: token};

  }
}