import { createContext } from 'react';

/**
 * @typedef {Object} CartItem
 * @property {string} id
 * @property {string} title
 * @property {number} price
 * @property {string} image
 * @property {number} quantity
 */

/**
 * @typedef {Object} CartContextValue
 * @property {CartItem[]} items
 * @property {number} totalCount
 * @property {number} rawPrice
 * @property {number} discountAmount
 * @property {number} totalPrice
 * @property {number} discountPercent
 * @property {string} promoCode
 * @property {string} promoError
 * @property {boolean} isEmpty
 * @property {(product: any, quantity?: number) => void} addItem
 * @property {(id: string, quantity: number) => void} updateQuantity
 * @property {(id: string) => void} removeItem
 * @property {() => void} clearCart
 * @property {(code: string) => void} applyPromoCode
 */

/** @type {import('react').Context<CartContextValue | null>} */
export const CartContext = createContext(null);

CartContext.displayName = 'CartContext';
