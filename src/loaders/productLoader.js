// Список існуючих ID товарів (для перевірки)
const EXISTING_IDS = ["p-001", "p-002", "p-003", "p-004", "p-005"];

export async function productLoader({ params, request }) {
  // Перевіряємо, чи існує товар з таким ID
  if (!EXISTING_IDS.includes(params.productId)) {
    throw new Response("Товар не знайдено", {
      status: 404,
      statusText: "Not Found",
    });
  }

  // Якщо ID існує, робимо запит до API
  const response = await fetch(
    `/api/products/${encodeURIComponent(params.productId)}`,
    { signal: request.signal }
  );

  if (!response.ok) {
    throw new Response("Помилка сервера", { status: response.status });
  }
  return response.json();
}