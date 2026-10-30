// src/hooks/useCart.js
import { useCartStore } from '../store/cartStore';
import {
  selectItems,
  selectTotalCount,
  selectTotalPrice,
} from '../store/cartSelectors';

export function useCart() {
  const items = useCartStore(selectItems);
  const addItem = useCartStore((state) => state.addItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const totalCount = useCartStore(selectTotalCount);
  const totalPrice = useCartStore(selectTotalPrice);

  return {
    items,
    addItem,
    updateQuantity,
    removeItem,
    totalCount,
    totalPrice,
  };
}