
'use client';

import { create } from 'zustand';
import type { Product, Category } from '@/lib/types';

// Omit the fields that are not part of the form
type ProductFormData = Omit<Product, 'id' | 'sellerId' | 'rating' | 'createdAt'> & {
    category: Category | '';
};


const initialState: ProductFormData = {
  title: '',
  description: '',
  price: 0,
  category: '',
  images: [],
  quantity: 1,
  condition: '',
  yearOfManufacture: undefined,
  brand: '',
  model: '',
  dimensions: {
    length: 0,
    width: 0,
    height: 0,
  },
  weight: undefined,
  material: '',
  color: '',
  originalPackaging: false,
  manualIncluded: false,
  workingCondition: '',
};

interface ListingState {
  product: ProductFormData;
  setProductField: <K extends keyof ProductFormData>(field: K, value: ProductFormData[K]) => void;
  setProduct: (product: ProductFormData) => void;
  reset: () => void;
}

export const useListingStore = create<ListingState>()((set) => ({
    product: initialState,
    setProductField: (field, value) => set(state => ({
        product: { ...state.product, [field]: value }
    })),
    setProduct: (product) => set({ product }),
    reset: () => set({ product: initialState }),
}));
