import { useContext } from "react";
import { NavLink, Outlet, useNavigation } from "react-router";
import { useCartContext } from "../context/useCartContext";
import DevMockPanel from "../components/DevMockPanel"; // <-- ДОДАНО
import BreakpointBadge from "../components/dev/BreakpointBadge"; // <-- ДОДАНО

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
  const { totalCount } = useCartContext();
  const navigation = useNavigation();
  const isNavigating = navigation.state === "loading";

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
        </nav>
      </header>

      {/* Оновлений блок головного вмісту з підтримкою плавного згасання при навігації */}
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

      {/* Індикатор брейкпоінта (тільки в режимі розробки) */}
      {import.meta.env.DEV && <BreakpointBadge />}

      {/* Панель керування мок-сервером (тільки в режимі розробки) */}
      {import.meta.env.DEV && <DevMockPanel />}
    </div>
  );
}
