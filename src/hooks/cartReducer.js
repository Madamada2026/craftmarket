/**
 * Позиція кошика CraftMarket.
 * @typedef {Object} CartItem
 * @property {string} id    ідентифікатор товару з каталогу
 * @property {string} title назва товару
 * @property {number} price ціна за одиницю, грн
 * @property {string} [image] URL зображення
 * @property {number} quantity кількість одиниць, завжди >= 1
 */

/** @typedef {{ items: CartItem[] }} CartState */

export const CART_ACTIONS = Object.freeze({
  ADD_ITEM: 'cart/addItem',
  REMOVE_ITEM: 'cart/removeItem',
  UPDATE_QUANTITY: 'cart/updateQuantity',
  CLEAR: 'cart/clear',
});

/** @type {CartState} */
export const initialCartState = Object.freeze({ items: [] });

/**
 * @param {CartState} state
 * @param {{ type: string, payload?: object }} action
 * @returns {CartState}
 */
export function cartReducer(state, action) {
  switch (action.type) {
    case CART_ACTIONS.ADD_ITEM: {
      const { product, quantity = 1 } = action.payload;
      const exists = state.items.some((item) => item.id === product.id);

      if (exists) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          ),
        };
      }

      const newItem = {
        id: product.id,
        title: product.title || product.name,
        price: product.price,
        image: product.image,
        quantity,
      };
      return { ...state, items: [...state.items, newItem] };
    }

    case CART_ACTIONS.REMOVE_ITEM:
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload.id),
      };

    case CART_ACTIONS.UPDATE_QUANTITY: {
      const { id, quantity } = action.payload;
      if (quantity <= 0) {
        return { ...state, items: state.items.filter((item) => item.id !== id) };
      }
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === id ? { ...item, quantity } : item
        ),
      };
    }

    case CART_ACTIONS.CLEAR:
      return initialCartState;

    default:
      throw new Error(`Невідома дія кошика: ${action.type}`);
  }
}
