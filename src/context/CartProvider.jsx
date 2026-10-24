import { useMemo } from 'react';
import PropTypes from 'prop-types';
import { CartContext } from './CartContext';
import { useCart } from '../hooks/useCart';

export function CartProvider({ children }) {
  const {
    items,
    totalCount,
    rawPrice,
    discountAmount,
    totalPrice,
    discountPercent,
    promoCode,
    promoError,
    isEmpty,
    addItem,
    updateQuantity,
    removeItem,
    clearCart,
    applyPromoCode,
  } = useCart();

  const value = useMemo(
    () => ({
      items,
      totalCount,
      rawPrice,
      discountAmount,
      totalPrice,
      discountPercent,
      promoCode,
      promoError,
      isEmpty,
      addItem,
      updateQuantity,
      removeItem,
      clearCart,
      applyPromoCode,
    }),
    [
      items,
      totalCount,
      rawPrice,
      discountAmount,
      totalPrice,
      discountPercent,
      promoCode,
      promoError,
      isEmpty,
      addItem,
      updateQuantity,
      removeItem,
      clearCart,
      applyPromoCode,
    ]
  );

  return <CartContext value={value}>{children}</CartContext>;
}

CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
