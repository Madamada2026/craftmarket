import { readFileSync } from "node:fs";

const css = readFileSync(
  new URL("../src/styles/tokens.css", import.meta.url),
  "utf8",
);

const colors = {
  white: "#ffffff",
  ...Object.fromEntries(
    [...css.matchAll(/--color-([\w-]+):\s*(#[0-9a-fA-F]{6})\s*;/g)].map(
      (m) => [m[1], m[2]],
    ),
  ),
};

const channel = (value) => {
  const c = value / 255;
  return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
};

const luminance = (hex) => {
  const n = parseInt(hex.slice(1), 16);
  const r = (n >> 16) & 255;
  const g = (n >> 8) & 255;
  const b = n & 255;
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
};

const ratio = (a, b) => {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};

const CHECKS = [
  ["white", "brand-600", 4.5, "Button primary: текст"],
  ["white", "brand-700", 4.5, "Button primary: hover"],
  ["white", "brand-800", 4.5, "Button primary: active"],
  ["brand-700", "white", 4.5, "Button secondary: текст"],
  ["brand-700", "brand-100", 4.5, "Button secondary: hover"],
  ["white", "danger-600", 4.5, "Button danger: текст"],
  ["white", "danger-700", 4.5, "Button danger: hover"],
  ["ink-900", "paper", 4.5, "Основний текст на тлі сторінки"],
  ["ink-600", "white", 4.5, "Input: підказка"],
  ["ink-500", "white", 4.5, "Input: placeholder"],
  ["danger-600", "white", 4.5, "Input: текст помилки"],
  ["ink-800", "ink-100", 4.5, "Badge neutral"],
  ["brand-800", "brand-100", 4.5, "Badge brand"],
  ["success-800", "success-100", 4.5, "Badge success"],
  ["warning-900", "warning-100", 4.5, "Badge warning"],
  ["danger-700", "danger-100", 4.5, "Badge danger"],
  ["ink-500", "white", 3, "Input: межа (нетекстовий контраст)"],
  ["danger-600", "white", 3, "Input: межа у стані помилки"],
  ["brand-600", "white", 3, "Контур фокуса на білому тлі"],
  ["brand-600", "paper", 3, "Контур фокуса на тлі сторінки"],
];

let failed = 0;
for (const [fg, bg, min, label] of CHECKS) {
  if (!colors[fg] || !colors[bg]) {
    console.error(`Невідомий токен: ${fg} або ${bg}`);
    failed += 1;
    continue;
  }
  const value = ratio(colors[fg], colors[bg]);
  const ok = value >= min;
  if (!ok) failed += 1;
  console.log(
    `${ok ? "OK  " : "FAIL"} ${value.toFixed(2).padStart(5)}  (мін. ${min})  ${label}`,
  );
}

process.exit(failed === 0 ? 0 : 1);
