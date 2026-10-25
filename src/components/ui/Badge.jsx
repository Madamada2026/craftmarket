import PropTypes from "prop-types";
import { cx } from "./cx.js";

const TONES = {
  neutral: "bg-ink-100 text-ink-800",
  brand: "bg-brand-100 text-brand-800",
  success: "bg-success-100 text-success-800",
  warning: "bg-warning-100 text-warning-900",
  danger: "bg-danger-100 text-danger-700",
};

export function Badge({ tone = "neutral", className, children }) {
  return (
    <span
      className={cx(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-sm font-medium",
        TONES[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

Badge.propTypes = {
  tone: PropTypes.oneOf(["neutral", "brand", "success", "warning", "danger"]),
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};