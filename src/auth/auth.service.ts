import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Role, User } from './entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { JwtUtilsService } from './jwt.utils';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
    private jwtUtilsService: JwtUtilsService,
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
    // console.log(user.role);
    const payload = {id: user.id, email: user.email, role: user.role, name:user.username};
    const token = this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET,
        expiresIn: process.env.JWT_EXPIRATION
    });
    return {message: 'Successfully logged in!', your_token: token};

  }
  
  async getAdminData(request:Request) {
    const token = this.jwtUtilsService.extractTokenFromHeader(request);
    // console.log("dekho: ",token);
    if(!token) {
        throw new UnauthorizedException('There is no authorization token!');
    }

    const decodedToken = this.jwtUtilsService.verifyToken(token);
    // console.log("This is Decoded Token: ",decodedToken)
    const email = decodedToken.email;

    const admin = await this.userRepository.findOneBy({email});
    const {password, ...result} = admin!;
    return result;
  }

  async getUserData(request:Request) {
    const token = this.jwtUtilsService.extractTokenFromHeader(request);
    // console.log("dekho: ",token);
    if(!token) {
        throw new UnauthorizedException('There is no authorization token!');
    }

    const decodedToken = this.jwtUtilsService.verifyToken(token);
    // console.log("This is Decoded Token: ",decodedToken)
    const email = decodedToken.email;

    const admin = await this.userRepository.findOneBy({email});
    const {password, ...result} = admin!;
    return result;
  }
}