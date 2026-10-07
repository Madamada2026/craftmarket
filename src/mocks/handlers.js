import { http, HttpResponse, delay } from "msw";
import { products } from "./data/products";

export const handlers = [
  http.get("/api/products", async () => {
    await delay(600);
    return HttpResponse.json(products);
  }),
];
