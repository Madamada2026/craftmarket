import { useContext } from 'react';
import { CartContext } from './CartContext';

/**
 * Повертає дані й дії кошика з найближчого CartProvider.
 * @returns {import('./CartContext').CartContextValue}
 */
export function useCartContext() {
  const context = useContext(CartContext);

  if (context === null) {
    throw new Error(
      'useCartContext має викликатися всередині <CartProvider>. ' +
        'Перевірте, чи обгорнуто <App /> у main.jsx.'
    );
  }

  return context;
}
