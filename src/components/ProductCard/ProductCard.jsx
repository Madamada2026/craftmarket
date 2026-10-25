import PropTypes from 'prop-types';
import placeholderSvg from '../../assets/product-placeholder.svg';
import AddToCartButton from './AddToCartButton';

const PLACEHOLDER = placeholderSvg;

const cardClasses = [
  'group flex w-full flex-col overflow-hidden',
  'rounded-card border border-line bg-white shadow-card',
  'transition-shadow duration-300 ease-soft hover:shadow-lift',
].join(' ');

const imageClasses = 'h-full w-full object-cover transition-transform duration-500 ease-soft';

const badgeClasses = 'w-fit rounded-full bg-clay-100 px-2.5 py-0.5 text-xs font-medium text-clay-700';

export default function ProductCard({ product }) {
  const { name, price, category, image, inStock, onSale } = product;
  
  // Умови для станів
  const imageState = inStock ? 'group-hover:scale-105' : 'grayscale';
  const tone = inStock ? 'text-ink' : 'text-ink-muted';

  return (
    <article className={cardClasses}>
      <div className="aspect-4/3 overflow-hidden bg-clay-50">
        <img
          src={image || PLACEHOLDER}
          alt={name}
          className={`${imageClasses} ${imageState}`}
        />
        {onSale && inStock && (
          <span className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
            Розпродаж
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4 relative">
        <span className={badgeClasses}>{category}</span>
        <h2 className={`font-display text-lg font-semibold leading-snug ${tone}`}>
          {name}
        </h2>
        <p className={`mt-auto text-xl font-bold ${tone}`}>
          {price.toLocaleString('uk-UA')}{' '}
          <span className="text-sm font-medium text-ink-muted">грн</span>
        </p>
        
        <AddToCartButton product={product} />
      </div>
    </article>
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
