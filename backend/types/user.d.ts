import { HydratedDocument, Model } from 'mongoose';
import { Request } from 'express';

export interface IUserFields {
  email: string;
  password: string;
  token: string;
  role: string;
  displayName: string;
  googleId?: string;
  avatar: string | null;
}

export interface IUserMethods {
  checkPassword(password: string): Promise<boolean>;

  generateToken(): void;
}

export type UserModel = Model<IUserFields, {}, IUserMethods>;

export interface IRequestWithUser extends Request {
  user?: HydratedDocument<IUserFields>;
}
