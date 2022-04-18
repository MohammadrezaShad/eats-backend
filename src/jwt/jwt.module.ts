import { JwtMiddleWare } from '@/jwt/jwt.middleware';
import { CONFIG_OPTIONS } from '@/common/constants/common.constants';
import { JwtModuleOptions } from './jwt.interface';
import { DynamicModule, Global, Module } from '@nestjs/common';
import { JwtService } from '@/jwt/jwt.service';

@Module({})
@Global()
export class JwtModule {
  static forRoot(options: JwtModuleOptions): DynamicModule {
    return {
      module: JwtModule,
      exports: [JwtService],
      providers: [
        {
          provide: CONFIG_OPTIONS,
          useValue: options,
        },
        JwtMiddleWare,
        JwtService,
      ],
      imports: [],
    };
  }
}
