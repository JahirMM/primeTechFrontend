import { CameraInterfa } from "@/share/interfaces/cameraInterface";

export interface AddCameraInterface extends Omit<CameraInterfa, "cameraId"> {}
