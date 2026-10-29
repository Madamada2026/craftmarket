import { useState } from 'react';
import { useProducts } from '../hooks/useProducts';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';
import ProductList from '../components/ProductList/ProductList';
import { getErrorMessage } from '../utils/getErrorMessage';

export default function CatalogPage() {
  const { status, products, error, retry } = useProducts();
  const [query, setQuery] = useState('');

  let content;

  if (status === 'loading') {
    content = <Loader />;
  } else if (status === 'error') {
    content = (
      <ErrorMessage
        title="Каталог не завантажено"
        message={getErrorMessage(error)}
        onRetry={retry}
      />
    );
  } else {
    const needle = query.trim().toLowerCase();
    const visible = products.filter((product) =>
      product.name.toLowerCase().includes(needle),
    );

    content = (
      <>
        <div className="mb-4">
          <label htmlFor="catalog-search" className="sr-only">
            Пошук за назвою товару
          </label>
          <input
            id="catalog-search"
            type="search"
            placeholder="Пошук товару..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="h-11 w-full rounded-control border border-ink-500 bg-paper px-4 text-base text-ink-900 placeholder:text-ink-500 focus:border-brand-600 focus:outline-2 focus:outline-offset-0 focus:outline-brand-600/40"
          />
        </div>
        <p className="my-4 text-ink-600" aria-live="polite">
          Знайдено: {visible.length}
        </p>
        <ProductList products={visible} searchQuery={query} />
      </>
    );
  }

  return (
    <section aria-labelledby="catalog-title" className="mx-auto max-w-7xl px-4">
      <h1 id="catalog-title" className="py-6 text-3xl font-bold text-ink-900">
        Каталог товарів
      </h1>
      {content}
    </section>
  );
}