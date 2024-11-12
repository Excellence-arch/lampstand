export interface User {
  name: string;
  id: string;
  email: string;
  username: string;
  verified: boolean;
  avatar: string;
}

export interface IData {
  message: string;
}

export interface IDataUser extends IData {
  user: User;
}
