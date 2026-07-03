import type { ImageMetadata } from "astro";
import type { DisciplineCode } from "@/data/disciplines";

export type GalleryImageItem = {
  kind?: "image";
  src: ImageMetadata | string;
  alt: string;
  caption?: string;
};

export type GalleryVideoItem = {
  kind: "video";
  src: string; // public/ 直下からの絶対パス e.g. "/videos/services/auto-aqua/foo.mp4"
  poster?: ImageMetadata | string;
  alt: string;
  caption?: string;
  loop?: boolean;
  autoplay?: boolean;
  controls?: boolean;
};

export type GalleryItem = GalleryImageItem | GalleryVideoItem;

export type ServiceMedia = {
  hero?: {
    src: ImageMetadata | string;
    alt: string;
    caption?: string;
    context?: string;
  };
  gallery?: GalleryItem[];
};

export type Service = {
  slug: string;
  index: string; // ゼロ埋め 3 桁。SERVICES の並びに合わせて手で振る
  name: string;
  nameLatin?: string;
  category: string;
  tagline: string;
  pitch: string;
  /** 略号で並べる分野コード (装飾ではなく情報構造) */
  disciplines: DisciplineCode[];
  highlights: { title: string; body: string }[];
  stack: string[];
  useCases: string[];
  status: "production" | "beta" | "in-development";
  statusLabel: string;
  /** 画像が用意されたら埋める。未設定でもタイポのみで成立 */
  media?: ServiceMedia;
};
