import { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { X } from "lucide-react";
import { useEscapeKey } from "../../hooks/useEscapeKey";
import { cx } from "./cx.js";

const EXIT_DURATION_MS = 200;

function getExitDelay() {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  return reduce ? 0 : EXIT_DURATION_MS;
}

const SIZES = {
  sm: "max-w-sm",
  lg: "max-w-2xl",
};

export function Modal({ isOpen, onClose, size = "sm", title, children }) {
  const [isClosing, setIsClosing] = useState(false);
  const requestClose = useCallback(() => setIsClosing(true), []);

  useEscapeKey(requestClose);

  useEffect(() => {
    if (!isClosing) return undefined;
    const timerId = setTimeout(onClose, getExitDelay());
    return () => clearTimeout(timerId);
  }, [isClosing, onClose]);

  // Скидаємо стан закриття при відкритті
  useEffect(() => {
    if (isOpen) setIsClosing(false);
  }, [isOpen]);

  function handleOverlayClick(event) {
    if (event.target === event.currentTarget) requestClose();
  }

  if (!isOpen) return null;

  return (
    <div
      role="presentation"
      onClick={handleOverlayClick}
      className={cx(
        "fixed inset-0 z-50 grid place-items-center bg-black/50 p-4",
        isClosing ? "animate-overlay-out" : "animate-overlay-in"
      )}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className={cx(
          "relative w-full rounded-control bg-white p-6 shadow-xl",
          SIZES[size],
          isClosing ? "animate-modal-out" : "animate-modal-in"
        )}
      >
        <button
          type="button"
          onClick={requestClose}
          aria-label="Закрити"
          className="absolute right-3 top-3 rounded-full p-2 transition duration-150 hover:bg-ink-100 active:scale-90"
        >
          <X aria-hidden="true" className="h-5 w-5" />
        </button>

        {title && (
          <h2 id="modal-title" className="pr-10 font-sans text-xl font-bold text-ink-900">
            {title}
          </h2>
        )}

        {children}
      </div>
    </div>
  );
}

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  size: PropTypes.oneOf(["sm", "lg"]),
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
};
