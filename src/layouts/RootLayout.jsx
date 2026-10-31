import { NavLink, Outlet, useNavigation } from "react-router";
import { useCartStore } from "../store/cartStore";
import { selectTotalCount } from "../store/cartSelectors";
// 1. Додаємо імпорт хука авторизації
import { useAuth } from "../context/AuthContext";
import DevMockPanel from "../components/DevMockPanel";
import BreakpointBadge from "../components/dev/BreakpointBadge";

const CATEGORY_LINKS = [
  { slug: "ceramics", title: "Кераміка" },
  { slug: "textile", title: "Текстиль" },
  { slug: "wood", title: "Дерево" },
];

const navLinkClass = ({ isActive }) => {
  const base = "rounded-control px-3 py-2 text-sm font-medium transition-colors";
  const state = isActive
    ? "bg-brand-100 text-brand-800"
    : "text-ink-600 hover:bg-ink-100";
  return `${base} ${state}`;
};

export default function RootLayout() {
  const totalCount = useCartStore(selectTotalCount);
  const navigation = useNavigation();
  const isNavigating = navigation.state === "loading";
  // 2. Деструктуризуємо стан та функцію виходу з контексту
  const { isAuthenticated, logout } = useAuth();

  return (
    <div className="flex min-h-screen flex-col bg-paper text-ink-900">
      <header className="border-b border-ink-300 bg-white">
        <nav
          aria-label="Головна навігація"
          className="mx-auto flex max-w-7xl items-center gap-2 px-4 py-3 sm:px-6 lg:px-8"
        >
          <NavLink to="/" end className={navLinkClass}>
            Каталог
          </NavLink>
          {CATEGORY_LINKS.map(({ slug, title }) => (
            <NavLink key={slug} to={`/category/${slug}`} className={navLinkClass}>
              {title}
            </NavLink>
          ))}
          <NavLink
            to="/cart"
            className={(state) => `${navLinkClass(state)} ml-auto`}
          >
            Кошик ({totalCount})
          </NavLink>

          {/* 3. Умовний рендеринг кнопок залежно від авторизації */}
          {isAuthenticated ? (
            <>
              <NavLink to="/orders" className={navLinkClass}>
                Мої замовлення
              </NavLink>
              <button 
                type="button" 
                onClick={logout} 
                className="rounded-control px-3 py-2 text-sm font-medium text-ink-600 underline hover:bg-ink-100 transition-colors"
              >
                Вийти
              </button>
            </>
          ) : (
            <NavLink to="/login" className={navLinkClass}>
              Увійти
            </NavLink>
          )}
        </nav>
      </header>

      <main
        className={`mx-auto w-full max-w-7xl flex-1 px-4 py-6 transition-opacity duration-300 motion-reduce:transition-none ${
          isNavigating ? "opacity-50" : "opacity-100"
        }`}
      >
        <Outlet />
      </main>

      <footer className="border-t border-ink-300 py-4 text-center text-sm text-ink-500">
        CraftMarket · вітрина виробів ручної роботи
      </footer>

      {import.meta.env.DEV && <BreakpointBadge />}
      {import.meta.env.DEV && <DevMockPanel />}
    </div>
  );
}
