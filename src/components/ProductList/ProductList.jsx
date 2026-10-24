import PropTypes from 'prop-types';
import ProductCard from '../ProductCard/ProductCard';
import styles from './ProductList.module.css';

function ProductList({ products, searchQuery }) {
  if (!products || products.length === 0) {
    return (
      <p className={styles.emptyMessage}>
        За запитом «{searchQuery}» нічого не знайдено.
      </p>
    );
  }

  return (
    <div className={styles.grid}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
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
