import PropTypes from 'prop-types';
import placeholderSvg from '../../assets/product-placeholder.svg';
import AddToCartButton from './AddToCartButton';

const PLACEHOLDER = placeholderSvg;

const cardClasses = [
  'group flex w-full flex-col overflow-hidden',
  'rounded-control border border-ink-300 bg-white shadow-sm',
  'transition-shadow duration-300 ease-soft hover:shadow-md',
].join(' ');

const imageClasses = 'h-full w-full object-cover transition-transform duration-500 ease-soft';

const badgeClasses = 'w-fit rounded-full bg-brand-100 px-2.5 py-0.5 text-xs font-medium text-brand-800';

export default function ProductCard({ product }) {
  const { name, price, category, image, inStock, onSale } = product;
  
  // Умови для станів
  const imageState = inStock ? 'group-hover:scale-105' : 'grayscale';
  const tone = inStock ? 'text-ink-900' : 'text-ink-500';

  return (
    <article className={cardClasses}>
      <div className="aspect-4/3 overflow-hidden bg-ink-100 relative">
        <img
          src={image || PLACEHOLDER}
          srcSet={image ? `${image} 1x, ${image} 2x` : undefined}
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          alt={name}
          width="400"
          height="300"
          className={`${imageClasses} ${imageState}`}
        />
        {onSale && inStock && (
          <span className="absolute top-2 left-2 bg-danger-600 text-white text-xs font-bold px-2 py-1 rounded">
            Розпродаж
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2 p-3 sm:p-4 relative">
        <span className={badgeClasses}>{category}</span>
        <h2 className={`line-clamp-2 font-sans text-base font-semibold leading-snug md:text-lg ${tone}`}>
          {name}
        </h2>
        <p className={`mt-auto pt-2 text-lg font-bold ${tone}`}>
          {price.toLocaleString('uk-UA')}{' '}
          <span className="text-sm font-medium text-ink-500">грн</span>
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
