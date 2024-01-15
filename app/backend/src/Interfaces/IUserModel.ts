import { JwtPayload } from 'jsonwebtoken';
import IUser from './IUser';

export default interface IUserModel {
  findbyEmail(email: IUser['email']): Promise<IUser | null>;
  getRole(token:string): Promise<boolean | JwtPayload | null>;
}
