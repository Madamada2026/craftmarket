import { CatalogPage } from './pages/CatalogPage.jsx';
import CartPage from './components/CartPage.jsx';
import CartBadge from './components/CartBadge.jsx';
import './App.css';

export default function App() {
  return (
    <div className="app">
      <header className="app__header">
        <p className="app__logo">CraftMarket</p>
        <CartBadge />
      </header>
      <main className="app__layout" style={{ display: 'flex', gap: '20px', padding: '20px' }}>
        <div style={{ flex: 1 }}>
          <CatalogPage />
        </div>
        <aside className="app__cart" aria-label="Кошик покупок" style={{ width: '320px' }}>
          <CartPage />
        </aside>
      </main>
    </div>
  );
}
