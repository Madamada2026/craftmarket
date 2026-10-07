import { useState, useEffect, useMemo } from 'react';
import SearchPanel from '../components/SearchPanel/SearchPanel';
import ProductList from '../components/ProductList/ProductList';
import { mockProducts } from '../data/mockProducts';
import './CatalogPage.css';

function CatalogPage() {
  // Зберігаємо пошуковий запит у localStorage
  const [searchQuery, setSearchQuery] = useState(() => {
    return localStorage.getItem('lastSearchQuery') || '';
  });

  // Стан для сортування (Варіант 12): 'name', 'price-asc', 'price-desc'
  const [sortBy, setSortBy] = useState('name');

  useEffect(() => {
    localStorage.setItem('lastSearchQuery', searchQuery);
  }, [searchQuery]);

  // 1. Фільтрація масиву
  const filteredProducts = useMemo(
    () =>
      mockProducts.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    [searchQuery]
  );

  // 2. Сортування відфільтрованого масиву
  const sortedProducts = useMemo(() => {
    return [...filteredProducts].sort((a, b) => {
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name, 'uk');
      }
      if (sortBy === 'price-asc') {
        return a.price - b.price;
      }
      if (sortBy === 'price-desc') {
        return b.price - a.price;
      }
      return 0;
    });
  }, [filteredProducts, sortBy]);

  return (
    <div className="catalog-page">
      <SearchPanel searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      {/* Елемент керування вибором поля сортування (Варіант 12) */}
      <div className="sort-controls" style={{ margin: '15px 0' }}>
        <label htmlFor="sort-select">Сортувати за: </label>
        <select
          id="sort-select"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          style={{ padding: '6px 10px', borderRadius: '4px', cursor: 'pointer' }}
        >
          <option value="name">Назвою (А-Я)</option>
          <option value="price-asc">Ціною (від найнижчої)</option>
          <option value="price-desc">Ціною (від найвищої)</option>
        </select>
      </div>

      <p className="catalog-page__count">
        Знайдено товарів: {sortedProducts.length}
      </p>

      {/* Передаємо відфільтровані та відсортовані товари в ProductList */}
      <ProductList products={sortedProducts} searchQuery={searchQuery} />
    </div>
  );
}

export default CatalogPage;
