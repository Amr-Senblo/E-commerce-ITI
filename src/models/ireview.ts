export interface IReview {
  id: number;
  user: number;
  product: number;
  rating: number;
  comment?: string;
  createdAt?: string;
  updatedAt?: string;
}
