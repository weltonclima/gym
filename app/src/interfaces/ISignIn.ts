import { IUser } from "./IUser";

export interface IFormSignIn {
  email: string;
  password: string;
}

export interface ISignIn {
  refresh_token: string;
  token: string;
  user: IUser
}