import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Product } from '@/lib/types';
import { toast } from '@/hooks/use-toast';

interface CartItem extends Product {
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  increaseQuantity: (productId: string) => void;
  decreaseQuantity: (productId: string) => void;
  clearCart: () => void;
  getItemCount: () => number;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addToCart: (product) => {
        const cart = get().items;
        const findProduct = cart.find((p) => p.id === product.id);
        if (findProduct) {
          findProduct.quantity += 1;
        } else {
          cart.push({ ...product, quantity: 1 });
        }
        set({ items: [...cart] });
        toast({
          title: "Added to cart!",
          description: `${product.title} has been added to your cart.`,
        });
      },
      removeFromCart: (productId) => {
        set({
          items: get().items.filter((item) => item.id !== productId),
        });
      },
      increaseQuantity: (productId: string) => {
        const cart = get().items;
        const findProduct = cart.find((p) => p.id === productId);
        if (findProduct) {
            findProduct.quantity += 1;
        }
        set({ items: [...cart] });
      },
      decreaseQuantity: (productId: string) => {
        const cart = get().items;
        const findProduct = cart.find((p) => p.id === productId);
        if (findProduct && findProduct.quantity > 1) {
            findProduct.quantity -= 1;
        } else {
            // Remove item if quantity is 1 or less
            set({ items: get().items.filter((item) => item.id !== productId) });
            return;
        }
        set({ items: [...cart] });
      },
      clearCart: () => {
        set({ items: [] });
      },
      getItemCount: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },
      getTotalPrice: () => {
        return get().items.reduce((total, item) => total + item.price * item.quantity, 0);
      }
    }),
    {
      name: 'ecofind-cart',
    }
  )
);
