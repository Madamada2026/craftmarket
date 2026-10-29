export class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

export async function fetchProducts({ signal } = {}) {
  const response = await fetch('/api/products', { signal });

  if (!response.ok) {
    throw new ApiError(
      `Запит завершився зі статусом ${response.status}`,
      response.status,
    );
  }

  return response.json();
}
