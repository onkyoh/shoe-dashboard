import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { g as goto } from "./client.js";
function cubicOut(t) {
  const f = t - 1;
  return f * f * f + 1;
}
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const flyAndScale = (node, params = { y: -8, x: 0, start: 0.95, duration: 150 }) => {
  const style = getComputedStyle(node);
  const transform = style.transform === "none" ? "" : style.transform;
  const scaleConversion = (valueA, scaleA, scaleB) => {
    const [minA, maxA] = scaleA;
    const [minB, maxB] = scaleB;
    const percentage = (valueA - minA) / (maxA - minA);
    const valueB = percentage * (maxB - minB) + minB;
    return valueB;
  };
  const styleToString = (style2) => {
    return Object.keys(style2).reduce((str, key) => {
      if (style2[key] === void 0)
        return str;
      return str + `${key}:${style2[key]};`;
    }, "");
  };
  return {
    duration: params.duration ?? 200,
    delay: 0,
    css: (t) => {
      const y = scaleConversion(t, [0, 1], [params.y ?? 5, 0]);
      const x = scaleConversion(t, [0, 1], [params.x ?? 0, 0]);
      const scale = scaleConversion(t, [0, 1], [params.start ?? 0.95, 1]);
      return styleToString({
        transform: `${transform} translate3d(${x}px, ${y}px, 0) scale(${scale})`,
        opacity: t
      });
    },
    easing: cubicOut
  };
};
function getFilterParams(url, param) {
  const values = url.searchParams.getAll(param);
  return values.length > 0 ? values.map((value) => value.split(",")) : null;
}
function getPageParam(url) {
  const pageNumberString = url.searchParams.get("page");
  if (!pageNumberString)
    return 0;
  const pageNumber = parseInt(pageNumberString);
  return isNaN(pageNumber) ? 0 : pageNumber;
}
function getRangeParams(url, minRangeParamName, maxRangeParamName) {
  const minRangeRaw = url.searchParams.get(minRangeParamName);
  const maxRangeRaw = url.searchParams.get(maxRangeParamName);
  const minRange = minRangeRaw ? parseFloat(minRangeRaw) : 0;
  const maxRange = maxRangeRaw ? parseFloat(maxRangeRaw) : 15;
  return [Math.min(minRange, maxRange), maxRange];
}
function getSortParam(url, defaultSort = ["created_at", "desc"]) {
  const sort = url.searchParams.get("sort");
  if (!sort) {
    return defaultSort;
  }
  const [sortFieldRaw, sortOrder] = sort.split("|");
  const sortField = sortFieldRaw === "date" ? "created_at" : sortFieldRaw;
  return [sortField, sortOrder];
}
function addSearchParam(field, value) {
  const currentParams = new URLSearchParams(window.location.search);
  currentParams.set(field, value.toString());
  goto();
}
function formatCreatedAt(createdAt) {
  if (!createdAt)
    return null;
  return new Date(createdAt).toLocaleDateString("en-US");
}
function formatName(name) {
  const parts = name.split(" ");
  if (parts.length > 1) {
    const lastName = parts.pop();
    if (!lastName)
      return name;
    return `${parts.join(" ")} ${lastName[0]}`;
  }
  return name;
}
export {
  formatCreatedAt as a,
  addSearchParam as b,
  cn as c,
  flyAndScale as d,
  getPageParam as e,
  formatName as f,
  getSortParam as g,
  getRangeParams as h,
  getFilterParams as i,
  cubicOut as j
};
