import { beforeEach, describe, expect, it } from 'vitest';
import { useCartStore } from './cartStore';
import { selectTotalCount, selectTotalPrice } from './cartSelectors';

const vase = { id: 'p1', title: 'Керамічна ваза', price: 450 };
const mug = { id: 'p2', title: 'Кухоль', price: 180 };

beforeEach(() => {
  useCartStore.setState({ items: [] });
});

describe('useCartStore', () => {
  it('додає новий товар із кількістю 1', () => {
    useCartStore.getState().addItem(vase);
    expect(useCartStore.getState().items).toEqual([{ ...vase, quantity: 1 }]);
  });

  it('збільшує кількість при повторному додаванні', () => {
    const { addItem } = useCartStore.getState();
    addItem(vase);
    addItem(vase);
    expect(useCartStore.getState().items[0].quantity).toBe(2);
  });

  it('видаляє позицію, якщо кількість стає нульовою', () => {
    const { addItem, updateQuantity } = useCartStore.getState();
    addItem(vase);
    updateQuantity('p1', 0);
    expect(useCartStore.getState().items).toHaveLength(0);
  });

  it('рахує кількість і суму через селектори', () => {
    const { addItem, updateQuantity } = useCartStore.getState();
    addItem(vase);
    addItem(mug);
    updateQuantity('p2', 3);

    const state = useCartStore.getState();
    expect(selectTotalCount(state)).toBe(4);
    expect(selectTotalPrice(state)).toBe(450 + 180 * 3);
  });
});