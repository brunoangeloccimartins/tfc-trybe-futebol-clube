import * as bcrypt from 'bcryptjs';
import { JwtPayload } from 'jsonwebtoken';
import { ILogin } from '../Interfaces/ILogin';
import { IToken } from '../Interfaces/IToken';
import JWT from '../utils/token/JWT';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import UserModel from '../model/user.model';

export default class UserService {
  constructor(
    private userModel: UserModel = new UserModel(),
  ) { }

  public async login(data:ILogin): Promise<ServiceResponse<IToken | null>> {
    const user = await this.userModel.findbyEmail(data.email);
    if (!user || !bcrypt.compareSync(data.password, user.password)) {
      return { status: 'UNAUTHORIZED', data: { message: 'Invalid email or password' } };
    }
    const token = JWT.sign({ role: user.role });
    return { status: 'SUCCESS', data: { token } };
  }

  public async getRole(data:string): Promise<ServiceResponse<boolean | JwtPayload>> {
    const user = await this.userModel.getRole(data);
    console.log(user);
    if (!user) {
      return { status: 'NOT_FOUND', data: { message: 'User not found' } };
    }
    const role = JWT.verify(data);
    return { status: 'SUCCESS', data: { role } };
  }
}
