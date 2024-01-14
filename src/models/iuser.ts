export interface IUser {
  id: number;
  name: string;
  email: string;
  password: string;
  accessToken: string;
  phone: string;
  profilePic?: string;
  Address?: string;
  gender?: string;
  passward: string;
  confirmPassward: string;
  wishlist?: number[];
}
