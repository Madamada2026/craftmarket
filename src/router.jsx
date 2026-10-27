import { createBrowserRouter } from "react-router";
import RootLayout from "./layouts/RootLayout.jsx";
import CatalogPage from "./pages/CatalogPage.jsx";
import CategoryPage from "./pages/CategoryPage.jsx";
import ProductPage from "./pages/ProductPage.jsx";
import CartPage from "./components/CartPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import RouteErrorBoundary from "./components/RouteErrorBoundary.jsx";
import { productLoader } from "./loaders/productLoader.js";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        errorElement: <RouteErrorBoundary />,
        children: [
          { index: true, element: <CatalogPage /> },
          { path: "category/:categorySlug", element: <CategoryPage /> },
          {
            path: "product/:productId",
            element: <ProductPage />,
            loader: productLoader,
            hydrateFallbackElement: (
              <p role="status" className="py-16 text-center">
                Завантаження товару…
              </p>
            ),
          },
          { path: "cart", element: <CartPage /> },
          { path: "*", element: <NotFoundPage /> },
        ],
      },
    ],
  },
]);
