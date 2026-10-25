import { CatalogPage } from './pages/CatalogPage.jsx';
import CartPage from './components/CartPage.jsx';
import CartBadge from './components/CartBadge.jsx';
import BreakpointBadge from './components/dev/BreakpointBadge';
import PageContainer from './components/layout/PageContainer';

export default function App() {
  return (
    <div className="min-h-screen bg-paper">
      {/* Шапка сайту */}
      <header className="border-b border-ink-300 bg-white shadow-sm">
        <PageContainer>
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-6">
              <a
                href="/"
                className="font-sans text-2xl font-bold tracking-tight text-brand-700"
              >
                CraftMarket
              </a>
              <p className="hidden text-sm text-ink-600 md:block">
                Товари ручної роботи від майстрів України
              </p>
            </div>
            <CartBadge />
          </div>
        </PageContainer>
      </header>

      {/* Головна область */}
      <main className="py-8">
        <PageContainer>
          <div className="flex flex-col gap-8 lg:flex-row">
            {/* Каталог займає більшу частину екрану */}
            <div className="flex-1">
              <h1 className="mb-6 font-sans text-3xl font-bold text-ink-900">
                Каталог товарів
              </h1>
              <CatalogPage />
            </div>

            {/* Кошик збоку (на великих екранах) */}
            <aside className="w-full lg:w-96">
              <div className="sticky top-8 rounded-control border border-ink-300 bg-white p-6 shadow-sm">
                <CartPage />
              </div>
            </aside>
          </div>
        </PageContainer>
      </main>

      {/* Індикатор брейкпоінта (тільки в режимі розробки) */}
      {import.meta.env.DEV && <BreakpointBadge />}
    </div>
  );
}

