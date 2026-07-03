import type { ImageMetadata } from "astro";
import type { GalleryImageItem, GalleryItem, GalleryVideoItem } from "./types";

/** GalleryItem が画像かどうかを判定（kind 未指定は画像として扱う） */
export function isGalleryImageItem(
  item: GalleryItem
): item is GalleryImageItem {
  return item.kind !== "video";
}

/** GalleryItem が動画かどうかを判定 */
export function isGalleryVideoItem(
  item: GalleryItem
): item is GalleryVideoItem {
  return item.kind === "video";
}

/** 値が Astro の ImageMetadata かどうかを判定 */
export function isImageMetadata(
  src: ImageMetadata | string | undefined
): src is ImageMetadata {
  return (
    typeof src !== "string" &&
    src != null &&
    typeof src.src === "string" &&
    typeof src.width === "number" &&
    typeof src.height === "number"
  );
}
