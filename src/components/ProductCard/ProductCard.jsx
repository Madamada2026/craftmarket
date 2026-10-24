import PropTypes from 'prop-types';
import './product-card.css';
import placeholderSvg from '../../assets/product-placeholder.svg';
import AddToCartButton from './AddToCartButton';

export default function ProductCard({ product }) {
  const { name, price, category, image, inStock, onSale } = product;

  return (
    <div className={`product-card ${!inStock ? 'product-card--out-of-stock' : ''}`}>
      <div className="product-card__image-wrapper">
        <img
          src={image || placeholderSvg}
          alt={name}
          className="product-card__image"
        />
        {onSale && inStock && (
          <span className="product-card__badge product-card__badge--sale">
            Розпродаж
          </span>
        )}
      </div>

      <div className="product-card__content">
        <h3 className="product-card__title">{name}</h3>
        <p className="product-card__price">{price} грн</p>
        <span className="product-card__category">{category}</span>

        {!inStock && (
          <div className="product-card__badge">Немає в наявності</div>
        )}

        <AddToCartButton product={product} />
      </div>
    </div>
  );
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    category: PropTypes.string,
    image: PropTypes.string,
    inStock: PropTypes.bool,
    onSale: PropTypes.bool,
  }).isRequired,
};
