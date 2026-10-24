import { useCart } from './hooks/useCart.js';
import { CatalogPage } from './pages/CatalogPage.jsx';
import CartPage from './components/CartPage.jsx';
import './App.css';

export default function App() {
  const cart = useCart();

  return (
    <div className="app">
      <header className="app__header">
        <p className="app__logo">CraftMarket</p>
        <p className="app__cart-counter" aria-live="polite">
          У кошику: {cart.totalCount} од.
        </p>
      </header>
      <main className="app__layout" style={{ display: 'flex', gap: '20px', padding: '20px' }}>
        <div style={{ flex: 1 }}>
          <CatalogPage onAddToCart={cart.addItem} />
        </div>
        <aside className="app__cart" aria-label="Кошик покупок" style={{ width: '320px' }}>
          <CartPage cart={cart} />
        </aside>
      </main>
    </div>
  );
}
