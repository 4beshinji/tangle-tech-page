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
import { farmOps } from "./farm-ops";
import { officeToybox } from "./office-toybox";
import { autoCell } from "./auto-cell";

export const SERVICES = [
  autoJa,
  farmOps,
  autoAqua,
  autoBee,
  officeToybox,
  hems,
  autoCell,
];
