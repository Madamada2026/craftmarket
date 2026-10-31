import { useAuth } from '../context/AuthContext';

const ORDERS = [
  { id: 'A-1042', date: '2026-09-28', total: 1240, status: 'Доставлено' },
  { id: 'A-1057', date: '2026-10-05', total: 680, status: 'У дорозі' },
];

export default function OrdersPage() {
  const { user } = useAuth();

  return (
    <section className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="mb-2 text-2xl font-semibold">Мої замовлення</h1>
      <p className="mb-6 text-stone-600">Обліковий запис: {user.email}</p>
      <ul className="space-y-3">
        {ORDERS.map((order) => (
          <li key={order.id} className="rounded border border-stone-300 p-4">
            <p className="font-medium">
              №{order.id} від {order.date}
            </p>
            <p>
              {order.total.toLocaleString('uk-UA')} ₴ · {order.status}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}