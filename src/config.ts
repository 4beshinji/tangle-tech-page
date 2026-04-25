export const SITE = {
  website: "https://tangle-tech.com/",
  author: "Tangle Tech",
  profile: "https://tangle-tech.com/",
  desc: "市場分析から生産現場、業務管理まで一貫した最適化を行うTangle Techのコーポレートサイト。",
  title: "Tangle Tech",
  ogImage: "og.png",
  lightAndDarkMode: true,
  postPerIndex: 4,
  postPerPage: 4,
  scheduledPostMargin: 15 * 60 * 1000,
  showArchives: false,
  showBackButton: true,
  editPost: { enabled: false, text: "", url: "" },
  dynamicOgImage: false,
  dir: "ltr",
  lang: "ja",
  timezone: "Asia/Tokyo",
} as const;

export const COMPANY = {
  name: "Tangle Tech",
  nameJa: "タングルテック",
  tagline: "もつれた課題を解きほぐす。",
  mission:
    "複雑に絡み合った問題をときほぐし、分断された世界を編み合わせる。",
  email: "4beshinji@gmail.com",
  domain: "tangle-tech.com",
} as const;
