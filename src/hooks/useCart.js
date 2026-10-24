import { useCallback, useMemo, useReducer } from 'react';
import { CART_ACTIONS, cartReducer, initialCartState } from './cartReducer.js';

/**
 * Кошик покупок CraftMarket.
 * Викликати ОДИН раз у спільному предку компонентів, яким потрібен кошик.
 */
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

  const totals = useMemo(() => {
    let totalCount = 0;
    let totalPrice = 0;
    for (const item of state.items) {
      totalCount += item.quantity;
      totalPrice += item.price * item.quantity;
    }
    return { totalCount, totalPrice };
  }, [state.items]);

  return {
    items: state.items,
    totalCount: totals.totalCount,
    totalPrice: totals.totalPrice,
    isEmpty: state.items.length === 0,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
  };
}
