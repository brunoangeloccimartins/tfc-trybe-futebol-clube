import { Request, Response } from 'express';
import UserService from '../service/user.service';

export default class UserController {
  constructor(private userService: UserService = new UserService()) {}

  public async login(req: Request, res: Response) {
    const response = await this.userService.login(req.body);
    if (response.status === 'NOT_FOUND') { return res.status(404).json(response.data); }
    res.status(200).json(response.data);
  }

  public async findByEmail(req: Request, res: Response) {
    const response = await this.userService.findByEmail(req.body.email);
    if (response.status === 'NOT_FOUND') { return res.status(404).json(response.data); }
    res.status(200).json(response.data);
  }
}
