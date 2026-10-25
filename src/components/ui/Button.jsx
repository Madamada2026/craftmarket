import PropTypes from "prop-types";
import { cx } from "./cx.js";

const BASE =
  "inline-flex items-center justify-center gap-2 rounded-control font-semibold " +
  "transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 " +
  "focus-visible:outline-brand-600 disabled:cursor-not-allowed disabled:opacity-60";

const VARIANTS = {
  primary: "bg-brand-600 text-white hover:bg-brand-700 active:bg-brand-800",
  secondary:
    "border-2 border-brand-700 bg-white text-brand-700 hover:bg-brand-100",
  danger: "bg-danger-600 text-white hover:bg-danger-700",
};

const SIZES = {
  sm: "h-9 px-3 text-sm",
  md: "h-11 px-5 text-base",
  lg: "h-12 px-6 text-lg",
};

export function Button({
  variant = "primary",
  size = "md",
  type = "button",
  className,
  children,
  ref,
  ...rest
}) {
  return (
    <button
      ref={ref}
      type={type}
      className={cx(BASE, VARIANTS[variant], SIZES[size], className)}
      {...rest}
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  variant: PropTypes.oneOf(["primary", "secondary", "danger"]),
  size: PropTypes.oneOf(["sm", "md", "lg"]),
  type: PropTypes.oneOf(["button", "submit", "reset"]),
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  ref: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.any }),
  ]),
};
