import { Request, Response, NextFunction } from 'express';
import JWT from '../utils/token/JWT';

export default class Validation {
  static loginValidation(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        message: 'All fields must be filled',
      });
    }
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email) || password.length < 6) {
      return res.status(400).json({
        message: 'Invalid email or password',
      });
    }
    next();
  }

  static async validateToken(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization;
    if (token?.startsWith('Bearer ')) {
      req.headers.authorization = token.slice(7, token.length);
    }
    if (!token) {
      return res.status(401).json({
        message: 'Token not found',
      });
    }
    try {
      const decoded = await JWT.verify(token);
      req.body = decoded;
      next();
    } catch (error) {
      return res.status(401).json({
        message: 'Token must be a valid token',
      });
    }
  }
}
