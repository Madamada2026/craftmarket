import PropTypes from 'prop-types';
import { Link } from "react-router";
import placeholderSvg from '../../assets/product-placeholder.svg';
import { Card, Badge, Button } from '../ui';
import { useCartStore } from '../../store/cartStore';

const PLACEHOLDER = placeholderSvg;

export default function ProductCard({ product, onOpenDetails }) {
  const { name, price, category, image, inStock, onSale } = product;
  
  console.count('render: ProductCard');

  const items = useCartStore((state) => state.items);
  const addItem = useCartStore((state) => state.addItem);
  
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
    <Card className="group flex w-full flex-col overflow-hidden transition duration-200 hover:-translate-y-1 hover:shadow-lg">
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
          <Link to={`/product/${product.id}`} className="hover:underline focus-visible:underline">
            {name}
          </Link>
        </h2>
        <p className={`mt-auto pt-2 text-lg font-bold ${inStock ? 'text-ink-900' : 'text-ink-500'}`}>
          {price.toLocaleString('uk-UA')}{' '}
          <span className="text-sm font-medium text-ink-500">грн</span>
        </p>
        
        <div className="mt-2 flex gap-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={onOpenDetails}
            className="flex-1 active:scale-95 transition duration-150"
          >
            Деталі
          </Button>
          <Button
            variant={inCart ? "secondary" : "primary"}
            size="sm"
            disabled={!inStock}
            onClick={handleAddToCart}
            className="flex-1 active:scale-95 transition duration-150 disabled:active:scale-100"
          >
            {!inStock
              ? "Немає"
              : inCart
              ? `У кошику (${inCart.quantity})`
              : "До кошика"}
          </Button>
        </div>
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
  onOpenDetails: PropTypes.func,
};