import { ReactNode } from "react";

export type FaceDetectorProps = {
  requests: Request[];
};

export type Request = {
  image: Image;
  features: Feature[];
};

export type Feature = {
  maxResults: number;
  type: string;
};

export type Image = {
  content: string;
};

export type ImgObjProps = {
  path: string;
  id: number;
  data: FaceAnnotation;
};

export type PhotoProps = {
  img: string;
  id: number;
  data: FaceAnnotation;
};

export type FaceAnnotation = {
  boundingPoly: BoundingPoly;
  fdBoundingPoly: BoundingPoly;
  landmarks: Landmark[];
  rollAngle: number;
  panAngle: number;
  tiltAngle: number;
  detectionConfidence: number;
  landmarkingConfidence: number;
  joyLikelihood: string;
  sorrowLikelihood: string;
  angerLikelihood: string;
  surpriseLikelihood: string;
  underExposedLikelihood: string;
  blurredLikelihood: string;
  headwearLikelihood: string;
};

export type BoundingPoly = {
  vertices: Vertex[];
};

export type Vertex = {
  x: number;
  y: number;
};

export type Landmark = {
  type: string;
  position: Position;
};

export type Position = {
  x: number;
  y: number;
  z: number;
};

export type ChildrenProps = {
  children: ReactNode;
};

export type IPhotos = ImgObjProps[];

export type PhotoContextValue = {
  photos: IPhotos;
  setPhotos: (photos: IPhotos) => void;
};
