import PropTypes from 'prop-types';
import placeholderSvg from '../../assets/product-placeholder.svg';
import { Card, Badge, Button } from '../ui';
import { useCartContext } from '../../context/useCartContext';

const PLACEHOLDER = placeholderSvg;

export default function ProductCard({ product }) {
  const { name, price, category, image, inStock, onSale } = product;
  const { items, addItem } = useCartContext();
  const inCart = items.find((item) => item.id === product.id);

  // Визначаємо стан товару для бейджа
  let badgeTone = "neutral";
  let badgeText = category;
  
  if (!inStock) {
    badgeTone = "danger";
    badgeText = "Немає в наявності";
  } else if (onSale) {
    badgeTone = "warning";
    badgeText = "Розпродаж";
  }

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      title: product.name,
      price: product.price,
      image: product.image,
      inStock: product.inStock,
    });
  };

  return (
    <Card className="group flex w-full flex-col overflow-hidden transition-shadow duration-300 hover:shadow-md">
      <div className="aspect-4/3 overflow-hidden bg-ink-100 relative">
        <img
          src={image || PLACEHOLDER}
          alt={name}
          className={`h-full w-full object-cover transition-transform duration-500 ease-soft ${
            inStock ? 'group-hover:scale-105' : 'grayscale'
          }`}
        />
      </div>

      <div className="flex flex-1 flex-col gap-2 p-3 sm:p-4">
        <Badge tone={badgeTone}>{badgeText}</Badge>
        <h2 className={`line-clamp-2 font-sans text-base font-semibold leading-snug md:text-lg ${inStock ? 'text-ink-900' : 'text-ink-500'}`}>
          {name}
        </h2>
        <p className={`mt-auto pt-2 text-lg font-bold ${inStock ? 'text-ink-900' : 'text-ink-500'}`}>
          {price.toLocaleString('uk-UA')}{' '}
          <span className="text-sm font-medium text-ink-500">грн</span>
        </p>
        
        <Button
          variant={inCart ? "secondary" : "primary"}
          size="md"
          disabled={!inStock}
          onClick={handleAddToCart}
          className="mt-2 w-full"
        >
          {!inStock
            ? "Немає в наявності"
            : inCart
            ? `У кошику (${inCart.quantity})`
            : "До кошика"}
        </Button>
      </div>
    </Card>
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
