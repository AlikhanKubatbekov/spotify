export interface User {
  _id: string;
  email: string;
  token: string;
  role: string;
  displayName: string;
  avatar: string | null;
  googleId: string;
}

export interface RegisterMutation {
  email: string;
  password: string;
  displayName: string;
  avatar: string | null;
}

export interface RegisterResponse {
  message: string;
  user: User;
}

export interface LoginMutation {
  email: string;
  password: string;
}
