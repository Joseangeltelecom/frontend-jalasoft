import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { PhotoContext } from "../Context/PhotoContext";
import NoPhotos from "./NoPhotos";
import { PhotoContextValue } from "../Types/Type";
import Photo from "../Components/Photo";

function PhotoList() {
  const { photos } = useContext(PhotoContext) as PhotoContextValue;

  return (
    <PhotoContainer>
      {photos.length !== 0 ? (
        photos.map((imgObj) => (
          <Photo
            key={imgObj.id}
            img={imgObj.path}
            id={imgObj.id}
            data={imgObj.data}
          />
        ))
      ) : (
        <NoPhotos />
      )}
    </PhotoContainer>
  );
}

export default PhotoList;

export const PhotoContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;
`;
