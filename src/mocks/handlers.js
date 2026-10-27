import { http, HttpResponse, delay } from "msw";
import { products } from "./data/products";

export const handlers = [
  http.get("/api/products", async () => {
    await delay(600);
    return HttpResponse.json(products);
  }),

  // Обробник для ВСІХ запитів до /api/*
  http.get("/api/*", async ({ request }) => {
    console.log("MSW: перехоплено запит до /api/*", request.url);
    await delay(400);
    return HttpResponse.json(
      { message: "Товар не знайдено" },
      { status: 404 }
    );
  }),
];