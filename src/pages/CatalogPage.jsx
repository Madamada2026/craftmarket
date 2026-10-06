import { useState, useEffect, useMemo } from 'react';
import SearchPanel from '../components/SearchPanel/SearchPanel';
import ProductList from '../components/ProductList/ProductList'; // Імпортуємо новий компонент
import { mockProducts } from '../data/mockProducts';
import './CatalogPage.css';

function CatalogPage() {
  // Зберігаємо ваш збережений стан з localStorage з ЛР3
  const [searchQuery, setSearchQuery] = useState(() => {
    return localStorage.getItem('lastSearchQuery') || '';
  });

  useEffect(() => {
    localStorage.setItem('lastSearchQuery', searchQuery);
  }, [searchQuery]);

  // Фільтрація масиву
  const filteredProducts = useMemo(
    () =>
      mockProducts.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    [searchQuery]
  );

  return (
    <div className="catalog-page">
      <SearchPanel value={searchQuery} onChange={setSearchQuery} />

      <p className="catalog-page__results-count">
        Знайдено товарів: {filteredProducts.length}
      </p>

      {/* Передаємо відфільтровані товари та пошуковий запит у новий компонент */}
      <ProductList products={filteredProducts} searchQuery={searchQuery} />
    </div>
  );
}

export default CatalogPage;

