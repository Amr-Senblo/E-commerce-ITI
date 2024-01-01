import { CommonSpecifications } from './common-specifications';

export interface IProduct {
  id: number;
  name: string;
  description: string;
  price: number;
 
  quantity: number;
  imageCover: string;
  images: string[];
  category: number;
  ratingAverage?: number;
  ratingQuantity?: number;
  createdAt?: string;
  updatedAt?: string;
  CommonSpecifications: CommonSpecifications;
}
