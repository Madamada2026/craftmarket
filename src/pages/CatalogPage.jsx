import { useEffect, useState } from "react";
import ProductList from "../components/ProductList/ProductList";

export function CatalogPage() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("name-asc");

  useEffect(() => {
    let isActive = true;

    async function loadProducts() {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch("/api/products");
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

  // Фільтрація за пошуком
  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Сортування
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOption === "name-asc") return a.name.localeCompare(b.name, "uk");
    if (sortOption === "price-desc") return b.price - a.price;
    if (sortOption === "price-asc") return a.price - b.price;
    return 0;
  });

  if (isLoading) {
    return (
      <p style={{ textAlign: "center", padding: "40px 0", color: "#64748b" }}>
        Завантаження каталогу…
      </p>
    );
  }

  if (error) {
    return (
      <p style={{ textAlign: "center", padding: "40px 0", color: "#dc2626" }} role="alert">
        Не вдалося завантажити каталог: {error}
      </p>
    );
  }

  return (
    <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "20px" }}>
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Пошук товару..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            width: "100%",
            padding: "10px 14px",
            fontSize: "15px",
            borderRadius: "6px",
            border: "1px solid #d1d5db",
            marginBottom: "15px",
          }}
        />
        <div style={{ textAlign: "center", fontSize: "14px", color: "#4b5563" }}>
          <label style={{ marginRight: "8px" }}>Сортувати за:</label>
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            style={{
              padding: "6px 10px",
              borderRadius: "4px",
              border: "1px solid #d1d5db",
            }}
          >
            <option value="name-asc">Назвою (А-Я)</option>
            <option value="price-desc">Ціною (від найвищої)</option>
            <option value="price-asc">Ціною (від найнижчої)</option>
          </select>
        </div>
        <p style={{ textAlign: "center", fontSize: "13px", color: "#6b7280", marginTop: "10px" }}>
          Знайдено товарів: {sortedProducts.length}
        </p>
      </div>

      <ProductList products={sortedProducts} searchQuery={searchQuery} />
    </div>
  );
}

export default CatalogPage;

