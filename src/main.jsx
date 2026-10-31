import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router/dom';
import { router } from './router.jsx';
// 1. Імпортуємо обидва провайдери
import { CategoriesProvider } from './context/CategoriesProvider';
import { AuthProvider } from './context/AuthContext';
import './index.css';

async function enableMocking() {
  if (import.meta.env.PROD) {
    return;
  }
  const { worker } = await import('./mocks/browser');
  return worker.start({ onUnhandledRequest: 'bypass' });
}

enableMocking().then(() => {
  createRoot(document.getElementById('root')).render(
    <StrictMode>
      {/* 2. Обгортаємо додаток в AuthProvider та CategoriesProvider */}
      <AuthProvider>
        <CategoriesProvider>
          <RouterProvider router={router} />
        </CategoriesProvider>
      </AuthProvider>
    </StrictMode>
  );
});
