import { useLoaderData, Link } from "react-router";
import { useCartContext } from "../context/useCartContext";
import { formatPrice } from "../utils/formatPrice.js";

export default function ProductPage() {
  const product = useLoaderData();
  const { addItem } = useCartContext();

  return (
    <article className="grid gap-8 md:grid-cols-2">
      <title>{`${product.name} | CraftMarket`}</title>

      <nav aria-label="Навігаційний ланцюжок" className="text-sm md:col-span-2">
        <Link to="/" className="underline">Каталог</Link>
        {" / "}
        <Link to={`/category/${product.category}`} className="underline">
          {product.category}
        </Link>
        {" / "}
        <span aria-current="page">{product.name}</span>
      </nav>

      <img
        src={product.image}
        alt={product.name}
        className="aspect-square w-full rounded-control object-cover"
      />

      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-semibold">{product.name}</h1>
        <p className="text-2xl font-bold">{formatPrice(product.price)}</p>
        <p className="text-ink-600">{product.description || 'Опис товару відсутній.'}</p>
        <button
          type="button"
          disabled={!product.inStock}
          onClick={() => addItem(product)}
          className="mt-auto rounded-control bg-brand-600 px-4 py-3 text-white disabled:bg-ink-300"
        >
          {product.inStock ? "Додати в кошик" : "Немає в наявності"}
        </button>
      </div>
    </article>
  );
}

// Додаємо експорт функції-завантажувача, яку вимагає router.jsx
export async function productLoader({ params, request }) {
  const response = await fetch(
    `/api/products/${encodeURIComponent(params.productId)}`,
    { signal: request.signal }
  );

  if (response.status === 404) {
    throw new Response("Товар не знайдено", {
      status: 404,
      statusText: "Not Found",
    });
  }
  if (!response.ok) {
    throw new Response("Помилка сервера", { status: response.status });
  }
  return response.json();
}
