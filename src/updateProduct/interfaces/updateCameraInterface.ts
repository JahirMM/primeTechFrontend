import { CameraInterfa } from "@/share/interfaces/cameraInterface";

export type UpdateCameraInterface = Pick<
  CameraInterfa,
  "type" | "resolution" | "aperture" | "opticalZoom" | "digitalZoom" | "feature"
>;
