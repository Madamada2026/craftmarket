import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { promoSchema } from '../schemas/promoSchema';
import CartItem from './CartItem.jsx';
import { formatPrice } from '../utils/formatPrice.js';
import { useCartContext } from '../context/useCartContext';

export default function CartPage() {
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
    updateQuantity,
    removeItem,
    clearCart,
    applyPromoCode,
  } = useCartContext();

  // Ініціалізація форми за допомогою React Hook Form та Zod
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(promoSchema),
    defaultValues: { promoCode: '' },
    mode: 'onSubmit',         // Валідація тільки при натисканні кнопки
    reValidateMode: 'onSubmit' // Повторна валідація також тільки при натисканні
  });

  // Обробка успішної відправки форми
  const onSubmit = (data) => {
    applyPromoCode(data.promoCode); // Викликаємо функцію з контексту
    reset(); // Очищаємо поле після відправки
  };

  if (isEmpty) {
    return (
      <section className="cart" aria-labelledby="cart-title">
        <h2 id="cart-title" className="cart__title">Кошик</h2>
        <p className="cart__empty">У кошику поки немає товарів. Оберіть щось у каталозі.</p>
      </section>
    );
  }

  return (
    <section className="cart" aria-labelledby="cart-title">
      <h2 id="cart-title" className="cart__title">Кошик ({totalCount})</h2>
      
      <ul className="cart__list">
        {items.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            onQuantityChange={updateQuantity}
            onRemove={removeItem}
          />
        ))}
      </ul>

      {/* Форма промокоду з валідацією через React Hook Form + Zod */}
      <div className="cart__promo" style={{ marginTop: '15px', marginBottom: '15px' }}>
        <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ display: 'flex', gap: '8px' }}>
            <input
              type="text"
              placeholder="Введіть промокод (CRAFT10)"
              {...register('promoCode')}
              style={{ padding: '6px 10px', borderRadius: '4px', border: '1px solid #ccc', flex: 1 }}
            />
            <button type="submit" style={{ padding: '6px 12px', cursor: 'pointer' }}>
              Застосувати
            </button>
          </div>
          
          {/* Помилка валідації форми (Zod) */}
          {errors.promoCode && (
            <p style={{ color: '#dc2626', fontSize: '13px', margin: 0 }}>
              {errors.promoCode.message}
            </p>
          )}

          {/* Помилка від логіки кошика (показуємо, лише якщо немає успішного промокоду) */}
          {promoError && !promoCode && (
            <p style={{ color: '#dc2626', fontSize: '13px', margin: 0 }}>
              {promoError}
            </p>
          )}

          {/* Успішне застосування */}
          {promoCode && (
            <p style={{ color: '#16a34a', fontSize: '13px', margin: 0, fontWeight: '500' }}>
              ✓ Застосовано промокод {promoCode} (-{discountPercent}%)
            </p>
          )}
        </form>
      </div>

      <div className="cart__summary">
        {discountAmount > 0 && (
          <p style={{ margin: '4px 0', fontSize: '14px', color: '#64748b' }}>
            Сума без знижки: <s>{formatPrice(rawPrice)}</s>
          </p>
        )}
        <p>
          Разом: <strong>{formatPrice(totalPrice)}</strong>
        </p>
        <button type="button" className="cart__clear" onClick={clearCart}>
          Очистити кошик
        </button>
      </div>
    </section>
  );
}
