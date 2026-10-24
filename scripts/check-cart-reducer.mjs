import assert from 'node:assert/strict';
import {
  CART_ACTIONS,
  cartReducer,
  initialCartState,
} from '../src/hooks/cartReducer.js';

const vase = { id: 'p-101', title: 'Керамічна ваза', price: 850, inStock: true };
const add = (state, product) =>
  cartReducer(state, { type: CART_ACTIONS.ADD_ITEM, payload: { product } });

// 1. Повторне додавання збільшує кількість, а не створює дубль
let state = add(add(initialCartState, vase), vase);
assert.equal(state.items.length, 1);
assert.equal(state.items[0].quantity, 2);

// 2. Оновлення не мутує попередній стан
const before = state;
const after = cartReducer(before, {
  type: CART_ACTIONS.UPDATE_QUANTITY,
  payload: { id: 'p-101', quantity: 5 },
});
assert.notEqual(after, before);
assert.notEqual(after.items, before.items);
assert.equal(before.items[0].quantity, 2);
assert.equal(after.items[0].quantity, 5);

// 3. Кількість 0 видаляє позицію
const emptied = cartReducer(after, {
  type: CART_ACTIONS.UPDATE_QUANTITY,
  payload: { id: 'p-101', quantity: 0 },
});
assert.deepEqual(emptied.items, []);

// 4. Невідома дія викидає виняток
assert.throws(() => cartReducer(state, { type: 'cart/unknown' }));

console.log('cartReducer: усі перевірки пройдено');
