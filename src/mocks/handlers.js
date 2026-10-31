import { http, HttpResponse, delay } from 'msw';
import { products } from './data/products';
// 1. Додаємо імпорт authHandlers
import { authHandlers } from './authHandlers';

export const mockControl = {
  delayMs: 800,
  failuresLeft: 0,
  failureMode: 'http', // 'http' | 'network'
};

export const handlers = [
  http.get('/api/categories', async () => {
    await delay(600);
    return HttpResponse.json([
      { id: 'ceramics', name: 'Кераміка' },
      { id: 'textile', name: 'Текстиль' },
      { id: 'wood', name: 'Дерево' },
    ]);
  }),

  http.get('/api/products', async () => {
    await delay(mockControl.delayMs);

    if (mockControl.failuresLeft > 0) {
      mockControl.failuresLeft -= 1;

      if (mockControl.failureMode === 'network') {
        return HttpResponse.error();
      }

      return HttpResponse.json(
        { message: 'Внутрішня помилка мок-сервера' },
        { status: 500 },
      );
    }

    return HttpResponse.json(products);
  }),

  http.get('/api/products/:id', async ({ params }) => {
    await delay(400);
    const product = products.find((item) => String(item.id) === params.id);
    if (!product) {
      return HttpResponse.json(
        { message: 'Товар не знайдено' },
        { status: 404 }
      );
    }
    return HttpResponse.json(product);
  }),

  // 2. Розгортаємо масив authHandlers за допомогою spread-оператора (...)
  ...authHandlers,
];
