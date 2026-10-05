import { useState } from 'react';
import SearchPanel from '../components/SearchPanel/SearchPanel';
import ProductCard from '../components/ProductCard/ProductCard';
import { mockProducts } from '../data/mockProducts';
import './CatalogPage.css';

function CatalogPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = mockProducts.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="catalog-page">
      <SearchPanel value={searchQuery} onChange={setSearchQuery} />

      <p className="catalog-page__results-count">
        Знайдено товарів: {filteredProducts.length}
      </p>

      {filteredProducts.length === 0 ? (
        <p className="catalog-page__empty-message">
          За запитом «{searchQuery}» нічого не знайдено.
        </p>
      ) : (
        <div className="catalog-page__grid">
          {filteredProducts.map((product) => (
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
      )}
    </div>
  );
}

export default CatalogPage;



