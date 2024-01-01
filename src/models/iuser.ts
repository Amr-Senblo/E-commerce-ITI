export interface IUser {
  id: number;
  name: string;
  email: string;
  phone: string;
  profilePic?: string;
  Address?: {
    street: string;
    city: string;
    country: string;
  };
  wishlist?: number[];
}
