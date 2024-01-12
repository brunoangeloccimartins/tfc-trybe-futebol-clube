import { Request, Response } from 'express';
import JWT from '../utils/token/JWT';
import UserService from '../service/user.service';

export default class UserController {
  constructor(
    private userService: UserService = new UserService(),
  ) {}

  public async login(req: Request, res: Response) {
    console.log(req.body);
    const response = await this.userService.login(req.body);
    if (response.status === 'NOT_FOUND') { return res.status(404).json(response.data); }
    res.status(200).json(response.data);
  }

  public static getRole(req: Request, res: Response) {
    const token = req.headers.authorization;
    if (!token) return res.status(401).json({ message: 'Token not found' });
    const role = JWT.verify(token);
    if (!role) return res.status(401).json({ message: 'Token not found' });
    res.status(200).json({ role });
  }
}
