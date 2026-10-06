import PropTypes from 'prop-types';
import ProductCard from '../ProductCard/ProductCard';

function ProductList({ products, searchQuery }) {
  // 1. Обробка порожнього стану (з вашої ЛР3)
  if (!products || products.length === 0) {
    return (
      <p className="catalog-page__empty-message">
        За запитом «{searchQuery}» нічого не знайдено.
      </p>
    );
  }

  // 2. Рендеринг сітки за допомогою .map() з ключем key={product.id}
  return (
    <div className="catalog-page__grid">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          name={product.name}
          price={product.price}
          category={product.category}
          image={product.image}
          inStock={product.inStock}
        />
      ))}
    </div>
  );
}

// 3. Обов'язкова за методичкою перевірка PropTypes
ProductList.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      image: PropTypes.string,
      category: PropTypes.string,
      inStock: PropTypes.bool,
    })
  ).isRequired,
  searchQuery: PropTypes.string,
};

export default ProductList;
