export type Category = 'Electronics' | 'Furniture' | 'Clothing' | 'Home Goods' | 'Books';

export type User = {
  id: string;
  username: string;
  email: string;
  avatar: string;
  bio: string;
};

export type Product = {
  id: string;
  title: string;
  description: string;
  price: number;
  category: Category;
  images: string[];
  sellerId: string;
  rating: number;
  createdAt: string;
  quantity?: number;
  condition?: string;
  yearOfManufacture?: number;
  brand?: string;
  model?: string;
  dimensions?: {
    length: number;
    width: number;
    height: number;
  };
  weight?: number;
  material?: string;
  color?: string;
  originalPackaging?: boolean;
  manualIncluded?: boolean;
  workingCondition?: string;
};

export type SortOption = 'date' | 'price-asc' | 'price-desc' | 'rating';
