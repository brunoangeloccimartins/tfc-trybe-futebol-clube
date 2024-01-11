import * as bcrypt from 'bcryptjs';
import { ILogin } from '../Interfaces/ILogin';
import { IToken } from '../Interfaces/IToken';
import JWT from '../utils/token/JWT';
import IUser from '../Interfaces/IUser';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import UserModel from '../model/user.model';

export default class UserService {
  constructor(
    private userModel: UserModel = new UserModel(),
  ) { }

  public async login(data:ILogin): Promise<ServiceResponse<IToken | null>> {
    const user = await this.userModel.findbyEmail(data.email);
    if (!user || !bcrypt.compareSync(data.password, user.password)) {
      return { status: 'NOT_FOUND', data: { message: 'User not found' } };
    }
    const token = JWT.sign({ role: user.role });
    return { status: 'SUCCESS', data: { token } };
  }

  public async findByEmail(email: IUser['email']): Promise<ServiceResponse<IUser | null>> {
    const user = await this.userModel.findbyEmail(email);
    if (!user) return { status: 'NOT_FOUND', data: { message: 'User not found' } };
    return { status: 'SUCCESS', data: user };
  }
}
