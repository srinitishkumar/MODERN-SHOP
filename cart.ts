import { create } from 'zustand';
import { CartState, Product } from '../types';

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  total: 0,
  addItem: (product: Product) => {
    set((state) => {
      const existingItem = state.items.find((item) => item.id === product.id);
      if (existingItem) {
        return {
          items: state.items.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
          total: state.total + product.price,
        };
      }
      return {
        items: [...state.items, { id: product.id, product, quantity: 1 }],
        total: state.total + product.price,
      };
    });
  },
  removeItem: (productId: number) => {
    set((state) => {
      const item = state.items.find((item) => item.id === productId);
      return {
        items: state.items.filter((item) => item.id !== productId),
        total: state.total - (item ? item.product.price * item.quantity : 0),
      };
    });
  },
  updateQuantity: (productId: number, quantity: number) => {
    set((state) => {
      const item = state.items.find((item) => item.id === productId);
      if (!item) return state;
      
      const quantityDiff = quantity - item.quantity;
      return {
        items: state.items.map((item) =>
          item.id === productId ? { ...item, quantity } : item
        ),
        total: state.total + item.product.price * quantityDiff,
      };
    });
  },
  clearCart: () => {
    set({ items: [], total: 0 });
  },
}));