import { JwtPayload } from 'jsonwebtoken';
import IUserModel from '../Interfaces/IUserModel';
import SequelizeUser from '../database/models/users.sequelize.model';
import IUser from '../Interfaces/IUser';
import JWT from '../utils/token/JWT';

export default class UserModel implements IUserModel {
  private model = SequelizeUser;
  private jwt = JWT;

  async findbyEmail(email: IUser['email']) : Promise<IUser | null> {
    const user = await this.model.findOne({ where: { email } });
    if (user === null) return null;
    return user.dataValues;
  }

  async getRole(token:string) : Promise<boolean | JwtPayload | null> {
    const role = await this.jwt.verify(token);
    if (role === null) return null;
    return role;
  }
}
