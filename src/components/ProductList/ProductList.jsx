import PropTypes from 'prop-types';
import ProductCard from '../ProductCard/ProductCard';

// Адаптивна сітка: 1 колонка за замовчуванням, 2 від sm, 4 від lg
const gridClasses = 'grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4 lg:gap-6';

const emptyClasses = [
  'mt-8 rounded-control border border-dashed border-ink-300',
  'bg-white px-6 py-12 text-center',
].join(' ');

function ProductList({ products, searchQuery, onOpenDetails }) {
  if (!products || products.length === 0) {
    return (
      <div className={emptyClasses}>
        <p className="font-sans text-xl font-semibold text-ink-900">
          Нічого не знайдено
        </p>
        <p className="mt-2 text-sm text-ink-600">
          За запитом «{searchQuery}» нічого не знайдено. Спробуйте змінити запит.
        </p>
      </div>
    );
  }

  return (
    <div className={gridClasses}>
      {products.map((product) => (
        <div key={product.id} className="flex">
          <ProductCard product={product} onOpenDetails={() => onOpenDetails(product)} />
        </div>
      ))}
    </div>
  );
}

ProductList.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      image: PropTypes.string,
      category: PropTypes.string,
      inStock: PropTypes.bool,
      onSale: PropTypes.bool,
    })
  ).isRequired,
  searchQuery: PropTypes.string,
  onOpenDetails: PropTypes.func,
};

export default ProductList;
