import { useEffect, useState } from 'react';
import ProductList from '../components/ProductList/ProductList';
import ReviewForm from '../components/ReviewForm';
import StatusMessage from '../components/StatusMessage';

export function CatalogPage() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('name-asc');
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    let isActive = true;

    async function loadProducts() {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch('/api/products');
        if (!response.ok) {
          throw new Error(`Сервер повернув статус ${response.status}`);
        }
        const data = await response.json();
        if (isActive) {
          setProducts(data);
        }
      } catch (err) {
        if (isActive) {
          setError(err.message);
        }
      } finally {
        if (isActive) {
          setIsLoading(false);
        }
      }
    }

    loadProducts();

    return () => {
      isActive = false;
    };
  }, []);

  const handleReviewSubmit = (newReview) => {
    const reviewWithId = {
      ...newReview,
      id: crypto.randomUUID ? crypto.randomUUID() : Date.now(),
    };
    setReviews((prev) => [...prev, reviewWithId]);
  };

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOption === 'name-asc') return a.name.localeCompare(b.name, 'uk');
    if (sortOption === 'price-desc') return b.price - a.price;
    if (sortOption === 'price-asc') return a.price - b.price;
    return 0;
  });

  if (isLoading) {
    return <StatusMessage status="loading" />;
  }

  if (error) {
    return <StatusMessage status="error" errorText={error} />;
  }

  return (
    <div className="w-full">
      {/* Панель керування: Пошук і Сортування */}
      <div className="mb-8 rounded-card border border-line bg-white p-4 shadow-card sm:flex sm:items-center sm:justify-between sm:gap-6">
        <div className="flex-1">
          <label htmlFor="catalog-search" className="sr-only">
            Пошук за назвою товару
          </label>
          <input
            id="catalog-search"
            type="search"
            placeholder="Пошук товару..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-edge bg-paper px-4 py-2.5 text-ink placeholder:text-ink-muted focus:border-clay-600 focus:outline-2 focus:outline-offset-0 focus:outline-clay-600/40"
          />
        </div>
        
        <div className="mt-4 flex items-center gap-3 sm:mt-0">
          <label htmlFor="sort-select" className="text-sm font-medium text-ink">
            Сортувати:
          </label>
          <select
            id="sort-select"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="rounded-lg border border-edge bg-paper px-4 py-2.5 text-sm text-ink focus:border-clay-600 focus:outline-none"
          >
            <option value="name-asc">Назвою (А-Я)</option>
            <option value="price-desc">Ціною (від найвищої)</option>
            <option value="price-asc">Ціною (від найнижчої)</option>
          </select>
        </div>
      </div>

      {/* Лічильник знайдених товарів */}
      <p role="status" className="mb-4 text-sm text-ink-muted">
        Знайдено товарів: <span className="font-semibold text-ink">{sortedProducts.length}</span>
      </p>

      {/* Сітка товарів */}
      <ProductList products={sortedProducts} searchQuery={searchQuery} />

      {/* Блок відгуків */}
      <div className="mt-12 border-t border-line pt-8">
        <ReviewForm onReviewSubmit={handleReviewSubmit} />

        {reviews.length > 0 && (
          <div className="mt-6 rounded-card border border-line bg-white p-6 shadow-card">
            <h4 className="mb-4 font-display text-lg font-bold text-ink">
              Додані відгуки ({reviews.length}):
            </h4>
            <ul className="space-y-4">
              {reviews.map((rev) => (
                <li key={rev.id} className="border-b border-line pb-4 last:border-0">
                  <p className="mb-1 text-sm text-ink">
                    <strong>Автор:</strong> {rev.authorName}
                  </p>
                  <p className="mb-1 text-sm text-ink">
                    <strong>Оцінка:</strong> {rev.rating} / 5
                  </p>
                  <p className="text-sm text-ink-muted">
                    <strong>Відгук:</strong> {rev.reviewText}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default CatalogPage;
