// src/hooks/useCart.js
import { useCallback, useMemo, useReducer } from 'react';
import { CART_ACTIONS, cartReducer, initialCartState } from './cartReducer.js';

export function useCart() {
  const [state, dispatch] = useReducer(cartReducer, initialCartState);

  const addItem = useCallback((product, quantity = 1) => {
    if (!product.inStock) return;
    dispatch({ type: CART_ACTIONS.ADD_ITEM, payload: { product, quantity } });
  }, []);

  const removeItem = useCallback((id) => {
    dispatch({ type: CART_ACTIONS.REMOVE_ITEM, payload: { id } });
  }, []);

  const updateQuantity = useCallback((id, quantity) => {
    dispatch({ type: CART_ACTIONS.UPDATE_QUANTITY, payload: { id, quantity } });
  }, []);

  const clearCart = useCallback(() => {
    dispatch({ type: CART_ACTIONS.CLEAR });
  }, []);

  // Метод для застосування промокоду
  const applyPromoCode = useCallback((code) => {
    dispatch({ type: CART_ACTIONS.APPLY_PROMO, payload: { code } });
  }, []);

  const totals = useMemo(() => {
    let totalCount = 0;
    let rawPrice = 0;

    for (const item of state.items) {
      totalCount += item.quantity;
      rawPrice += item.price * item.quantity;
    }

    // Розрахунок підсумкової суми з урахуванням знижки
    const discountAmount = Math.round((rawPrice * state.discountPercent) / 100);
    const totalPrice = rawPrice - discountAmount;

    return { totalCount, rawPrice, discountAmount, totalPrice };
  }, [state.items, state.discountPercent]);

  return {
    items: state.items,
    totalCount: totals.totalCount,
    rawPrice: totals.rawPrice,
    discountAmount: totals.discountAmount,
    totalPrice: totals.totalPrice,
    discountPercent: state.discountPercent,
    promoCode: state.promoCode,
    promoError: state.promoError,
    isEmpty: state.items.length === 0,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    applyPromoCode,
  };
}
