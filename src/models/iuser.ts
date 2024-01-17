import { IOrder } from "./iorder";

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
 
  confirmPassword:string
  wishlist?: number[];
  orders?: IOrder[]
}
