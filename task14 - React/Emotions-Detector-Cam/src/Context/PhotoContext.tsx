import { createContext, ReactNode, useState } from "react";
import { ImgObjProps } from "../Types/Type";

export type ChildrenProps = {
  children: ReactNode;
};

export type IPhotos = ImgObjProps[];

export type PhotoContextValue = {
  photos: IPhotos;
  setPhotos: (photos: IPhotos) => void;
};

const PhotoContext = createContext<PhotoContextValue | null>(null);

const ContextProvider = ({ children }: ChildrenProps) => {
  const [photos, setPhotos] = useState<IPhotos>([]);

  return (
    <PhotoContext.Provider value={{ photos, setPhotos }}>
      {children}
    </PhotoContext.Provider>
  );
};

export { PhotoContext };
export default ContextProvider;
