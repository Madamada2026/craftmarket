import { Link, useParams } from "react-router";
import { useProducts } from "../hooks/useProducts";
import { useCategoriesContext } from "../context/useCategoriesContext";
import ProductList from "../components/ProductList/ProductList";
import Loader from "../components/Loader";
import { getErrorMessage } from "../utils/getErrorMessage";

const CATEGORY_MAP = {
  ceramics: "Кераміка",
  textile: "Текстиль",
  wood: "Дерево",
};

export default function CategoryPage() {
  const { categorySlug } = useParams();
  const { status, products, error, retry } = useProducts();
  const { categories } = useCategoriesContext();

  // Перевірка, чи існує така категорія
  const category = categories.find((c) => c.id === categorySlug);

  if (status === 'loading') {
    return <Loader />;
  }

  if (status === 'error') {
    return (
      <div role="alert" className="mx-auto max-w-md rounded-control border border-danger-100 bg-danger-100 p-6 text-center">
        <h2 className="text-lg font-semibold text-danger-700">Каталог не завантажено</h2>
        <p className="mt-2 text-danger-700">{getErrorMessage(error)}</p>
        <button
          type="button"
          onClick={retry}
          className="mt-4 rounded-control bg-danger-600 px-4 py-2 font-medium text-white hover:bg-danger-700"
        >
          Спробувати ще раз
        </button>
      </div>
    );
  }

  const categoryName = category ? category.name : (CATEGORY_MAP[categorySlug] || categorySlug);
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