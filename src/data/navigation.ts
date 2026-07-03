export const NAV_ITEMS = [
  { href: "/#practice", index: "01", label: "Practice" },
  { href: "/#works", index: "02", label: "Works" },
  { href: "/#about", index: "03", label: "About" },
  { href: "/#contact", index: "04", label: "Contact" },
] as const;

export type NavItem = (typeof NAV_ITEMS)[number];
