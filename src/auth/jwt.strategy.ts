import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { AuthService } from './auth.service';
import { isNotEmptyObject } from 'class-validator';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: "jwtConstants.secret"
    });
  }

  async validate({ sub }: any) {
    const user: any = {}
    console.log(user);
    
    if (!isNotEmptyObject(user)) {
      throw new UnauthorizedException();
    }
    return {
      id: user.id,
      email: user.email,
      emailVerified: user.emailVerified
    };
  }
}
