import IUser from './IUser';

export default interface IUserModel {
  findbyEmail(email: IUser['email']): Promise<IUser | null>
}
