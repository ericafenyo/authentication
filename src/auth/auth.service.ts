import { Injectable, Logger } from '@nestjs/common';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { AuthenticatedUser } from './user.decorator';
import { ApplicationService } from 'src/application/application.service';
import fs = require('fs');
import bcrypt = require('bcrypt');

const TAG = 'AUTH_SERVICE';
export interface JWTokens {
  accessToken: string;
  refreshToken: string;
}

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private appService: ApplicationService,
  ) {}

  async validateUser(email: string, password: string): Promise<AuthenticatedUser | null> {
    try {
      const user = await this.userService.findByEmail(email);
      const passwordMatched = await bcrypt.compare(password, user.password);
      if (passwordMatched) {
        return {
          id: user.id,
          email: user.email,
          verified: user.verified,
          avatar: user.avatar,
        };
      }
      return null;
    } catch (error) {
      Logger.error(error, TAG);
    }
  }

  /**
   * Generates Json Web Tokens.
   *
   * @param {AuthenticatedUser} user a metadata of the authenticated user.
   *
   * @returns a {@link JWTokens} object.
   */

  async getToken(user: AuthenticatedUser, applicationId: string): Promise<JWTokens> {
    const privateKey = fs.readFileSync('./secret-key', 'utf8');

    const jwtOptions: JwtSignOptions = {
      audience: 'TAtYgWjxL1CG3lsCNPMe4c2rbqxc1Hdh',
      algorithm: 'RS256',
      expiresIn: 86400,
      subject: `auth|${user.id}`,
      secret: privateKey,
    };

    const payload = {
      email_verified: user.verified,
      avatar: user.avatar,
    };

    return { accessToken: this.jwtService.sign(payload, jwtOptions), refreshToken: '' };
  }
}
