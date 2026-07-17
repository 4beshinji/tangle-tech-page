export const NAV_ITEMS = [
  { href: "/#vision", index: "01", label: "構想" },
  { href: "/#core", index: "02", label: "中核システム" },
  { href: "/#research", index: "03", label: "研究実装" },
  { href: "/#contact", index: "04", label: "連絡" },
] as const;

export type NavItem = (typeof NAV_ITEMS)[number];
