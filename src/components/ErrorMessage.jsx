import PropTypes from 'prop-types';

export default function ErrorMessage({ title, message, onRetry }) {
  return (
    <div
      role="alert"
      className="mx-auto max-w-md rounded-control border border-danger-100 bg-danger-100 p-6 text-center"
    >
      <h2 className="text-lg font-semibold text-danger-700">{title}</h2>
      <p className="mt-2 text-danger-700">{message}</p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="mt-4 rounded-control bg-danger-600 px-4 py-2 font-medium text-white hover:bg-danger-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-danger-600"
        >
          Спробувати ще раз
        </button>
      )}
    </div>
  );
}

ErrorMessage.propTypes = {
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  onRetry: PropTypes.func,
};