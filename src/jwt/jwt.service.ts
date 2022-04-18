import { CONFIG_OPTIONS } from '@/common/constants/common.constants';
import { JwtModuleOptions } from '@/jwt/jwt.interface';
import { Inject, Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtService {
  constructor(@Inject(CONFIG_OPTIONS) private options: JwtModuleOptions) {}

  sign(userId: string, signOptions?: jwt.SignOptions) {
    return jwt.sign({ id: userId }, this.options.privateKey, signOptions);
  }

  verify(token: string) {
    try {
      console.log({ token, key: this.options.privateKey });
      return jwt.verify(token, this.options.privateKey);
    } catch (error) {
      console.log(error);
    }
  }
}
