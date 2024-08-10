export interface User {
  id: number;
  email: string;
}
export interface UserLogin {
  email: string;
  password: string;
}

export interface UserLoginStore {
  userData: UserLogin | null;
  setUserData: (user: UserLogin) => void;
}
export interface UserStore {
  user: User | null;
  loginUser: (user: User) => void;
  logoutUser: () => void;
}

export type LoginInputs = {
  email: string;
  password: string;
  passwordConfirm: string;
};
