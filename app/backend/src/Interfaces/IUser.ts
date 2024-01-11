import { ILogin } from './ILogin';

export type ID = number;

export type Identify = { id: ID };

export default interface IUser extends Identify, ILogin {
  id: number;
  username: string;
  role: string;
  email: string;
  password: string;
}
