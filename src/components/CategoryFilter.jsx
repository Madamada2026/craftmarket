import { useCategoriesContext } from '../context/useCategoriesContext';

export default function CategoryFilter() {
  const { status, categories } = useCategoriesContext();

  if (status === 'loading') return <p>Завантаження категорій…</p>;
  if (status === 'error') return <p>Помилка завантаження категорій</p>;

  return (
    <select className="rounded border p-2">
      <option value="">Усі категорії</option>
      {categories.map((cat) => (
        <option key={cat.id} value={cat.id}>
          {cat.name}
        </option>
      ))}
    </select>
  );
}