import React from "react";
import { ImageModel } from "../../models/image.model";

const ImagePreview = (props: { image: ImageModel }) => {
  return (
    <>
      <img src={props.image.url} alt={props.image.title} />
      <p>{props.image.title}</p>
    </>
  );
};

export default ImagePreview;
