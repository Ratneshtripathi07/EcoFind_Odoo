
import { create } from 'zustand';
import type { Product, User } from '@/lib/types';
import { products as initialProducts, users as initialUsers } from '@/lib/mock-data';

interface MockDataState {
  users: User[];
  products: Product[];
  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (productId: string) => void;
  updateUser: (user: User) => void;
  addUser: (user: User) => void;
}

export const useMockDataStore = create<MockDataState>((set) => ({
  users: initialUsers,
  products: initialProducts,
  addUser: (user) => set((state) => ({
    users: [...state.users, user],
  })),
  addProduct: (product) => set((state) => ({
    products: [...state.products, product],
  })),
  updateProduct: (updatedProduct) => set((state) => ({
    products: state.products.map((p) =>
      p.id === updatedProduct.id ? updatedProduct : p
    ),
  })),
  deleteProduct: (productId) => set((state) => ({
    products: state.products.filter((p) => p.id !== productId),
  })),
  updateUser: (updatedUser) => set((state) => ({
    users: state.users.map((u) => (u.id === updatedUser.id ? updatedUser : u)),
  })),
}));
