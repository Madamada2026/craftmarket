import PropTypes from 'prop-types';
import { useCartContext } from '../../context/useCartContext';

export default function AddToCartButton({ product }) {
  const { items, addItem } = useCartContext();
  const inCart = items.find((item) => item.id === product.id);

  if (!product.inStock) {
    return (
      <button
        type="button"
        className="product-card__add"
        disabled
        style={{
          marginTop: '10px',
          padding: '8px 16px',
          backgroundColor: '#cbd5e1',
          color: '#ffffff',
          border: 'none',
          borderRadius: '6px',
          cursor: 'not-allowed',
          fontWeight: '600',
          fontSize: '13px',
        }}
      >
        Немає в наявності
      </button>
    );
  }

  return (
    <button
      type="button"
      className="product-card__add"
      onClick={() =>
        addItem({
          id: product.id,
          title: product.name,
          price: product.price,
          image: product.image,
          inStock: product.inStock,
        })
      }
      style={{
        marginTop: '10px',
        padding: '8px 16px',
        backgroundColor: inCart ? '#f59e0b' : '#0d9488',
        color: '#ffffff',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
        fontWeight: '600',
        fontSize: '13px',
      }}
    >
      {inCart ? `У кошику (${inCart.quantity}) — додати ще` : 'До кошика'}
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
