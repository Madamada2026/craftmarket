import { CatalogPage } from './pages/CatalogPage.jsx';
import CartPage from './components/CartPage.jsx';
import CartBadge from './components/CartBadge.jsx';

// Ширина вмісту спільна для шапки й головної області
const container = 'mx-auto max-w-7xl px-4 sm:px-6 lg:px-8';

export default function App() {
  return (
    <div className="min-h-screen bg-paper">
      {/* Шапка сайту */}
      <header className="border-b border-line bg-white shadow-sm">
        <div className={`${container} flex items-center justify-between py-4`}>
          <div className="flex items-center gap-6">
            <a
              href="/"
              className="font-display text-2xl font-bold tracking-tight text-clay-700"
            >
              CraftMarket
            </a>
            <p className="hidden text-sm text-ink-muted md:block">
            </p>
          </div>
          <CartBadge />
        </div>
      </header>

      {/* Головна область */}
      <main className={`${container} py-8`}>
        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Каталог займає більшу частину екрану */}
          <div className="flex-1">
            <h1 className="mb-6 font-display text-3xl font-bold text-ink">
              Каталог товарів
            </h1>
            <CatalogPage />
          </div>

          {/* Кошик збоку (на великих екранах) */}
          <aside className="w-full lg:w-96">
            <div className="sticky top-8 rounded-card border border-line bg-white p-6 shadow-card">
              <CartPage />
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
