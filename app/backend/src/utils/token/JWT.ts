import { JwtPayload, Secret, SignOptions, sign, verify } from 'jsonwebtoken';

export default class JWT {
  private static secret: Secret = process.env.JWT_SECRET || 'jwt_secret';

  private static jwtConfig: SignOptions = {
    algorithm: 'HS256',
    expiresIn: '1d',
  };

  public static sign(payload: JwtPayload): string {
    return sign(payload, JWT.secret, JWT.jwtConfig);
  }

  public static verify(token: string): JwtPayload | boolean {
    try {
      const payload = verify(token, JWT.secret) as JwtPayload;
      const { role } = payload;
      return role;
    } catch (error) {
      return false;
    }
  }
}
