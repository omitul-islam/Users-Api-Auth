import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
    ForbiddenException  
  } from '@nestjs/common';
  
  import { Request } from 'express';
import { JwtUtilsService } from '../jwt.utils';
  
  @Injectable()
  export class AdminGuard implements CanActivate{
     constructor(private readonly jwtUtilsService: JwtUtilsService){}
      canActivate(context: ExecutionContext): boolean {
          const request : Request = context.switchToHttp().getRequest();
          const token = this.jwtUtilsService.extractTokenFromHeader(request);
  
          if(!token) {
              throw new UnauthorizedException('No token is provided!');
          }
          const decoded = this.jwtUtilsService.verifyToken(token);
          if(decoded.role !== 'admin') {
              throw new ForbiddenException('Protected route for Admin only!');
          }  
          return true;
      }
  }