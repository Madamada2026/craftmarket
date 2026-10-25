import { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { X } from 'lucide-react';
import { useEscapeKey } from '../hooks/useEscapeKey';

const EXIT_DURATION_MS = 200;

function getExitDelay() {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  return reduce ? 0 : EXIT_DURATION_MS;
}

export default function ProductModal({ product, onClose }) {
  const [isClosing, setIsClosing] = useState(false);
  const requestClose = useCallback(() => setIsClosing(true), []);

  useEscapeKey(requestClose);

  useEffect(() => {
    if (!isClosing) return undefined;
    const timerId = setTimeout(onClose, getExitDelay());
    return () => clearTimeout(timerId);
  }, [isClosing, onClose]);

  function handleOverlayClick(event) {
    if (event.target === event.currentTarget) requestClose();
  }

  return (
    <div
      role="presentation"
      onClick={handleOverlayClick}
      className={`fixed inset-0 z-50 grid place-items-center bg-black/50 p-4 ${
        isClosing ? 'animate-overlay-out' : 'animate-overlay-in'
      }`}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="product-modal-title"
        className={`relative w-full max-w-lg rounded-control bg-white p-6 shadow-xl ${
          isClosing ? 'animate-modal-out' : 'animate-modal-in'
        }`}
      >
        <button
          type="button"
          onClick={requestClose}
          aria-label="Закрити"
          className="absolute right-3 top-3 rounded-full p-2 transition duration-150 hover:bg-ink-100 active:scale-90"
        >
          <X aria-hidden="true" className="h-5 w-5" />
        </button>

        <h2 id="product-modal-title" className="pr-10 font-sans text-xl font-bold text-ink-900">
          {product.name}
        </h2>
        <p className="mt-1 text-sm text-ink-500">{product.category}</p>
        {product.image && (
          <img src={product.image} alt={product.name}
               className="mt-4 aspect-video w-full rounded-control object-cover" />
        )}
        <p className="mt-4 text-2xl font-bold text-ink-900">{product.price} грн</p>
      </div>
    </div>
  );
}

ProductModal.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    category: PropTypes.string,
    image: PropTypes.string,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};
