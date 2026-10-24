// src/hooks/cartReducer.js

export const CART_ACTIONS = Object.freeze({
  ADD_ITEM: 'cart/addItem',
  REMOVE_ITEM: 'cart/removeItem',
  UPDATE_QUANTITY: 'cart/updateQuantity',
  CLEAR: 'cart/clear',
  APPLY_PROMO: 'cart/applyPromo', // Нова дія для промокоду
});

/** @type {CartState} */
export const initialCartState = Object.freeze({
  items: [],
  promoCode: '',         // Застосований промокод
  discountPercent: 0,   // Відсоток знижки
  promoError: '',        // Повідомлення про помилку
});

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

    // ОБРОБКА ІНДИВІДУАЛЬНОГО ЗАВДАННЯ № 6 (Промокод CRAFT10)
    case CART_ACTIONS.APPLY_PROMO: {
      const code = action.payload.code.trim().toUpperCase();

      // Крайовий випадок 1: повторне введення того самого діючого промокоду
      if (code === state.promoCode) {
        return {
          ...state,
          promoError: 'Цей промокод вже застосовано!',
        };
      }

      // Перевірка валідності промокоду
      if (code === 'CRAFT10') {
        return {
          ...state,
          promoCode: 'CRAFT10',
          discountPercent: 10,
          promoError: '', // Очищаємо помилку при успіху
        };
      }

      // Крайовий випадок 2: невідомий код не змінює суму, а записує помилку в стан
      return {
        ...state,
        promoError: 'Невідомий промокод. Спробуйте CRAFT10',
      };
    }

    default:
      throw new Error(`Невідома дія кошика: ${action.type}`);
  }
}
