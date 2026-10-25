import PropTypes from "prop-types";
import { cx } from "./cx.js";

export function Card({ className, children, ...rest }) {
  return (
    <div
      className={cx(
        "rounded-control border border-ink-300 bg-white shadow-sm",
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
}

Card.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};
