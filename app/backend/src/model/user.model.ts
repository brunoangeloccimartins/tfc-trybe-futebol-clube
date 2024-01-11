import IUserModel from '../Interfaces/IUserModel';
import SequelizeUser from '../database/models/users.sequelize.model';
import IUser from '../Interfaces/IUser';

export default class UserModel implements IUserModel {
  private model = SequelizeUser;

  async findbyEmail(email: IUser['email']) : Promise<IUser | null> {
    const user = await this.model.findOne({ where: { email } });
    if (user === null) return null;
    return user.dataValues;
  }
}
