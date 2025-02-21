import { CameraInterfa } from "@/share/interfaces/cameraInterface";

export interface UpdateCameraInterface
  extends Pick<
    CameraInterfa,
    | "type"
    | "resolution"
    | "aperture"
    | "opticalZoom"
    | "digitalZoom"
    | "feature"
  > {}
