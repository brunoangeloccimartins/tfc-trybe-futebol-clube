import { Request, Response } from 'express';
import UserService from '../service/user.service';
import JWT from '../utils/token/JWT';

export default class UserController {
  constructor(
    private userService: UserService = new UserService(),
    private jwt: JWT = new JWT(),
  ) {}

  public async login(req: Request, res: Response) {
    const response = await this.userService.login(req.body);
    if (response.status === 'NOT_FOUND') { return res.status(404).json(response.data); }
    res.status(200).json(response.data);
  }

  public async getRole(req: Request, res: Response) {
    const token = req.headers.authorization;
    console.log(token);
    const response = await this.userService.getRole(token?.slice(7) || '');
    console.log(response);
    if (response.status === 'NOT_FOUND') { return res.status(404).json(response.data); }
    res.status(200).json(response.data);
  }
}
