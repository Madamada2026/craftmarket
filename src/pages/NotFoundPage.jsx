import { Link } from "react-router";

export default function NotFoundPage() {
  return (
    <section className="py-16 text-center">
      <title>404: сторінку не знайдено | CraftMarket</title>
      <h1 className="text-3xl font-semibold">404: сторінку не знайдено</h1>
      <p className="mt-2 text-ink-600">
        Адреса неправильна або сторінку було видалено.
      </p>
      <Link to="/" className="mt-6 inline-block rounded-control bg-brand-600 px-4 py-2 text-white">
        Повернутися до каталогу
      </Link>
    </section>
  );
}
