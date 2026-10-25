import { useCallback, useEffect, useState } from 'react';
import ProductList from '../components/ProductList/ProductList';
import { ReviewForm } from '../components/ReviewForm';
import StatusMessage from '../components/StatusMessage';
import ProductModal from '../components/ProductModal';

export function CatalogPage() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('name-asc');
  const [reviews, setReviews] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

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

  const handleCloseModal = useCallback(() => setSelectedProduct(null), []);

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
      {/* Панель керування: Пошук і Сортування (адаптивна) */}
      <div className="mb-8 flex flex-col gap-4 rounded-control border border-ink-300 bg-white p-4 shadow-sm md:flex-row md:items-end md:justify-between">
        <div className="flex-1 w-full">
          <label htmlFor="catalog-search" className="sr-only">
            Пошук за назвою товару
          </label>
          <input
            id="catalog-search"
            type="search"
            placeholder="Пошук товару..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-11 w-full rounded-control border border-ink-500 bg-paper px-4 text-base text-ink-900 placeholder:text-ink-500 focus:border-brand-600 focus:outline-2 focus:outline-offset-0 focus:outline-brand-600/40"
          />
        </div>
        
        <div className="flex items-center gap-3 w-full md:w-auto">
          <label htmlFor="sort-select" className="text-sm font-medium text-ink-900 whitespace-nowrap">
            Сортувати:
          </label>
          <select
            id="sort-select"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="h-11 w-full rounded-control border border-ink-500 bg-white px-4 text-base text-ink-900 focus:border-brand-600 focus:outline-none md:w-64"
          >
            <option value="name-asc">Назвою (А-Я)</option>
            <option value="price-desc">Ціною (від найвищої)</option>
            <option value="price-asc">Ціною (від найнижчої)</option>
          </select>
        </div>
      </div>

      {/* Лічильник знайдених товарів */}
      <p role="status" className="mb-4 text-sm text-ink-600">
        Знайдено товарів: <span className="font-semibold text-ink-900">{sortedProducts.length}</span>
      </p>

      {/* Сітка товарів */}
      <ProductList 
        products={sortedProducts} 
        searchQuery={searchQuery} 
        onOpenDetails={setSelectedProduct}
      />

      {/* Модальне вікно */}
      {selectedProduct && (
        <ProductModal product={selectedProduct} onClose={handleCloseModal} />
      )}

      {/* Блок відгуків */}
      <div className="mt-12 border-t border-ink-300 pt-8">
        <ReviewForm onReviewSubmit={handleReviewSubmit} />

        {reviews.length > 0 && (
          <div className="mt-6 rounded-control border border-ink-300 bg-white p-6 shadow-sm">
            <h4 className="mb-4 font-sans text-lg font-bold text-ink-900">
              Додані відгуки ({reviews.length}):
            </h4>
            <ul className="space-y-4">
              {reviews.map((rev) => (
                <li key={rev.id} className="border-b border-ink-300 pb-4 last:border-0">
                  <p className="mb-1 text-sm text-ink-900">
                    <strong>Автор:</strong> {rev.authorName}
                  </p>
                  <p className="mb-1 text-sm text-ink-900">
                    <strong>Оцінка:</strong> {rev.rating} / 5
                  </p>
                  <p className="text-sm text-ink-600">
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
