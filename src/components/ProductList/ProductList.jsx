import PropTypes from 'prop-types';
import ProductCard from '../ProductCard/ProductCard';

// Адаптивна сітка: 1 колонка за замовчуванням, 2 від sm, 4 від lg
const gridClasses = 'grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4 lg:gap-6';

const emptyClasses = [
  'mt-8 rounded-card border border-dashed border-line',
  'bg-white px-6 py-12 text-center',
].join(' ');

function ProductList({ products, searchQuery }) {
  if (!products || products.length === 0) {
    return (
      <div className={emptyClasses}>
        <p className="font-display text-xl font-semibold text-ink">
          Нічого не знайдено
        </p>
        <p className="mt-2 text-sm text-ink-muted">
          За запитом «{searchQuery}» нічого не знайдено. Спробуйте змінити запит.
        </p>
      </div>
    );
  }

  return (
    <div className={gridClasses}>
      {products.map((product) => (
        <div key={product.id} className="flex">
          <ProductCard product={product} />
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
};

export default ProductList;
