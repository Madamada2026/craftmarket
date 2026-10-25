import { useId } from "react";
import PropTypes from "prop-types";
import { cx } from "./cx.js";

export function Input({
  label,
  hint,
  error,
  as: Control = "input",
  id,
  className,
  ref,
  ...rest
}) {
  const autoId = useId();
  const controlId = id ?? autoId;
  const hintId = hint ? `${controlId}-hint` : undefined;
  const errorId = error ? `${controlId}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined;

  return (
    <div className={cx("flex flex-col gap-1.5", className)}>
      <label htmlFor={controlId} className="text-sm font-semibold text-ink-900">
        {label}
      </label>
      {hint && (
        <p id={hintId} className="text-sm text-ink-600">
          {hint}
        </p>
      )}
      <Control
        id={controlId}
        ref={ref}
        aria-invalid={error ? "true" : undefined}
        aria-describedby={describedBy}
        className={cx(
          "w-full rounded-control border-2 bg-white px-3 py-2 text-base text-ink-900",
          "placeholder:text-ink-500 focus-visible:outline-2 focus-visible:outline-offset-2",
          "focus-visible:outline-brand-600 disabled:cursor-not-allowed disabled:opacity-60",
          error ? "border-danger-600" : "border-ink-500",
        )}
        {...rest}
      />
      {error && (
        <p id={errorId} role="alert" className="text-sm font-medium text-danger-600">
          {error}
        </p>
      )}
    </div>
  );
}

Input.propTypes = {
  label: PropTypes.string.isRequired,
  hint: PropTypes.string,
  error: PropTypes.string,
  as: PropTypes.oneOf(["input", "textarea"]),
  id: PropTypes.string,
  className: PropTypes.string,
  ref: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.any }),
  ]),
};
