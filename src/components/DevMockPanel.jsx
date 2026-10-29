import { mockControl } from '../mocks/handlers';

const scenarios = [
  {
    label: 'Наступний запит: HTTP 500',
    apply: () => {
      mockControl.failuresLeft = 1;
      mockControl.failureMode = 'http';
    },
  },
  {
    label: 'Наступний запит: обрив мережі',
    apply: () => {
      mockControl.failuresLeft = 1;
      mockControl.failureMode = 'network';
    },
  },
  {
    label: 'Повільна відповідь (3 с)',
    apply: () => {
      mockControl.delayMs = 3000;
    },
  },
  {
    label: 'Скинути сценарії',
    apply: () => {
      mockControl.failuresLeft = 0;
      mockControl.delayMs = 800;
    },
  },
];

export default function DevMockPanel() {
  return (
    <aside
      aria-label="Керування мок-сервером (лише розробка)"
      className="fixed bottom-4 right-4 z-50 w-64 rounded-control border border-ink-300 bg-white p-3 shadow-lg"
    >
      <p className="mb-2 text-sm font-semibold text-ink-800">Мок-сервер</p>
      <div className="flex flex-col gap-2">
        {scenarios.map(({ label, apply }) => (
          <button
            key={label}
            type="button"
            onClick={apply}
            className="rounded border border-ink-300 px-2 py-1 text-left text-sm hover:bg-ink-100"
          >
            {label}
          </button>
        ))}
      </div>
    </aside>
  );
}