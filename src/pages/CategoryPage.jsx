import { Link, useParams } from "react-router";
import { useProducts } from "../hooks/useProducts.js";
import ProductList from "../components/ProductList/ProductList";

// Мапа відповідності: слаг в URL -> назва категорії в даних
const CATEGORY_MAP = {
  ceramics: "Кераміка",
  textile: "Текстиль",
  wood: "Дерево",
};

export default function CategoryPage() {
  const { categorySlug } = useParams();
  const { products, isLoading, error, retry } = useProducts();

  if (isLoading) return <p role="status">Завантаження каталогу…</p>;
  if (error) {
    return (
      <div role="alert">
        <p>Не вдалося завантажити каталог.</p>
        <button type="button" onClick={retry}>Спробувати знову</button>
      </div>
    );
  }

  // Отримуємо назву категорії з мапи, або використовуємо слаг як є
  const categoryName = CATEGORY_MAP[categorySlug] || categorySlug;

  const categoryProducts = products.filter((p) => p.category === categoryName);

  return (
    <section>
      <title>{`Категорія: ${categoryName} | CraftMarket`}</title>
      <nav aria-label="Навігаційний ланцюжок" className="mb-4 text-sm">
        <Link to="/" className="underline">Каталог</Link> / {categoryName}
      </nav>
      <h1 className="mb-4 text-2xl font-semibold">Категорія: {categoryName}</h1>
      <ProductList products={categoryProducts} searchQuery="" />
    </section>
  );
}
