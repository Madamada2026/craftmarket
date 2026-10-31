import { createBrowserRouter } from 'react-router';
import RootLayout from './layouts/RootLayout';
import CatalogPage from './pages/CatalogPage';
import CategoryPage from './pages/CategoryPage';
import ProductPage from './pages/ProductPage';
import CartPage from './components/CartPage';
import LoginPage from './pages/LoginPage';
import OrdersPage from './pages/OrdersPage';
import ProtectedRoute from './components/ProtectedRoute';
import NotFoundPage from './pages/NotFoundPage';
import RouteErrorBoundary from './components/RouteErrorBoundary';
import { productLoader } from './loaders/productLoader';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        errorElement: <RouteErrorBoundary />,
        children: [
          { index: true, element: <CatalogPage /> },
          { path: 'category/:categorySlug', element: <CategoryPage /> },
          {
            path: 'product/:productId',
            element: <ProductPage />,
            loader: productLoader,
            hydrateFallbackElement: (
              <p role="status" className="py-16 text-center">
                Завантаження товару…
              </p>
            ),
          },
          { path: 'cart', element: <CartPage /> }, // <- Проверьте, чтобы здесь ОБЯЗАТЕЛЬНО была запятая!
          
          { path: 'login', element: <LoginPage /> },
          {
            element: <ProtectedRoute />,
            children: [{ path: 'orders', element: <OrdersPage /> }],
          },
          
          { path: '*', element: <NotFoundPage /> },
        ],
      },
    ],
  },
]);
