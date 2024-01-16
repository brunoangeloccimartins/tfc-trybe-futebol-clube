import { Request, Response } from 'express';
import UserService from '../service/user.service';

export default class UserController {
  constructor(
    private userService: UserService = new UserService(),
  ) {}

  public async login(req: Request, res: Response) {
    const response = await this.userService.login(req.body);
    if (response.status === 'UNAUTHORIZED') { return res.status(401).json(response.data); }
    res.status(200).json(response.data);
  }

  public async getRole(req: Request, res: Response) {
    const token = req.headers.authorization;
    if (!token) { return res.status(401).json({ message: 'Token not found' }); }
    const tokenWithoutBearer = token.startsWith('Bearer ') ? token.slice(7) : token;
    const response = await this.userService.getRole(tokenWithoutBearer);
    if (response.status === 'NOT_FOUND') { return res.status(404).json(response.data); }
    res.status(200).json(response.data);
  }
}
