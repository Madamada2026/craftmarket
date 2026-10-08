import { useEffect, useState } from "react";
import ProductList from "../components/ProductList/ProductList";
import ReviewForm from "../components/ReviewForm";

export function CatalogPage() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("name-asc");
  const [reviews, setReviews] = useState([]);

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

  const handleReviewSubmit = (newReview) => {
    setReviews((prev) => [...prev, newReview]);
  };

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

      {/* Список товарів із ЛР5 */}
      <ProductList products={sortedProducts} searchQuery={searchQuery} />

      {/* Форма відгуку з ЛР6 */}
      <ReviewForm onReviewSubmit={handleReviewSubmit} />

      {/* Список збережених відгуків */}
      {reviews.length > 0 && (
        <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#f8fafc', borderRadius: '6px', border: '1px solid #e2e8f0', maxWidth: '500px' }}>
          <h4 style={{ fontWeight: 'bold', marginBottom: '10px' }}>Додані відгуки ({reviews.length}):</h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {reviews.map((rev, index) => (
              <li key={index} style={{ marginBottom: '10px', padding: '10px', borderBottom: '1px solid #cbd5e1' }}>
                <p style={{ margin: '0 0 4px 0' }}><strong>Автор:</strong> {rev.authorName}</p>
                <p style={{ margin: '0 0 4px 0' }}><strong>Оцінка:</strong> {rev.rating} / 5</p>
                <p style={{ margin: 0 }}><strong>Відгук:</strong> {rev.reviewText}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default CatalogPage;


