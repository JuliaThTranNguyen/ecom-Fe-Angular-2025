import { Category } from './category.model';

export interface Product {
  productId: number;
  title: string;
  description: string;
  category: Category;
  price: number;
  image: string;
  stock: number;
}

export interface PaginatedProductsResponse {
  content: Product[];
  pageNo: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  last: boolean;
}
