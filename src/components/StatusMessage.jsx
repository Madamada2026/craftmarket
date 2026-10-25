import PropTypes from 'prop-types';

export default function StatusMessage({ status, errorText }) {
  if (status === 'loading') {
    return (
      <div
        role="status"
        className="mt-8 flex items-center justify-center gap-3 rounded-card border border-line bg-white p-6 shadow-card text-ink-muted"
      >
        <div className="h-5 w-5 animate-spin rounded-full border-2 border-clay-600 border-t-transparent"></div>
        <p>Завантаження каталогу…</p>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div
        role="alert"
        className="mt-8 rounded-card border border-clay-600 bg-clay-50 p-6 text-clay-700 shadow-sm"
      >
        <h3 className="mb-1 font-display text-lg font-bold">Помилка завантаження</h3>
        <p className="text-sm">
          Не вдалося завантажити каталог: {errorText}. Спробуйте оновити сторінку.
        </p>
      </div>
    );
  }

  return null;
}

StatusMessage.propTypes = {
  status: PropTypes.oneOf(['loading', 'error']).isRequired,
  errorText: PropTypes.string,
};
