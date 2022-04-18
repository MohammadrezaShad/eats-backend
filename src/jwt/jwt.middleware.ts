import { UsersService } from './../users/users.service';
import { NestMiddleware, Injectable } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from './jwt.service';

@Injectable()
export class JwtMiddleWare implements NestMiddleware {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}
  async use(req: Request, res: Response, next: NextFunction) {
    if ('authorization' in req.headers) {
      const bearerHeader = req.headers.authorization;
      const token = bearerHeader.replace('Bearer ', '');
      try {
        const decoded = this.jwtService.verify(token);
        if (typeof decoded === 'object' && decoded.hasOwnProperty('id')) {
          const { id } = decoded;
          const { user } = await this.usersService.findById(id);
          req['user'] = user;
        }
      } catch (error) {
        console.log(error);
      }
    }
    next();
  }
}
