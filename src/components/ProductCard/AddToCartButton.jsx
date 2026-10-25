import PropTypes from 'prop-types';
import { useCartContext } from '../../context/useCartContext';

const classes = [
  // розмітка
  'inline-flex w-full items-center justify-center rounded-lg px-4 py-2.5 mt-2',
  // типографіка
  'text-sm font-semibold text-white',
  // колір і стани наведення та натискання (лише для доступної кнопки)
  'bg-clay-600 enabled:hover:bg-clay-700 enabled:active:bg-clay-700',
  // видимий фокус для керування з клавіатури
  'focus-visible:outline-2 focus-visible:outline-offset-2',
  'focus-visible:outline-clay-700',
  // недоступний стан
  'disabled:cursor-not-allowed disabled:bg-line disabled:text-ink-muted',
  // плавний перехід
  'transition-colors duration-200 ease-soft motion-reduce:transition-none',
].join(' ');

export default function AddToCartButton({ product }) {
  const { items, addItem } = useCartContext();
  const inCart = items.find((item) => item.id === product.id);

  if (!product.inStock) {
    return (
      <button type="button" disabled className={classes}>
        Немає в наявності
      </button>
    );
  }

  return (
    <button
      type="button"
      className={classes}
      onClick={() =>
        addItem({
          id: product.id,
          title: product.name,
          price: product.price,
          image: product.image,
          inStock: product.inStock,
        })
      }
    >
      {inCart ? `У кошику (${inCart.quantity})` : 'До кошика'}
    </button>
  );
}

AddToCartButton.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string,
    inStock: PropTypes.bool.isRequired,
  }).isRequired,
};
