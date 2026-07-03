export type {
  GalleryImageItem,
  GalleryItem,
  GalleryVideoItem,
  Service,
  ServiceMedia,
} from "./types";

export {
  isGalleryImageItem,
  isGalleryVideoItem,
  isImageMetadata,
} from "./helpers";

import { autoBee } from "./auto-bee";
import { autoJa } from "./auto-ja";
import { autoAqua } from "./auto-aqua";
import { hems } from "./hems";
import { nuai } from "./nuai";
import { officeToybox } from "./office-toybox";

export const SERVICES = [autoBee, autoJa, autoAqua, hems, nuai, officeToybox];
