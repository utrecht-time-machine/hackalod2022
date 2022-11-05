import React from "react";
import { ImageModel } from "../../models/image.model";

const ImagePreview = (props: { image: ImageModel }) => {
  return (
    <>
      <img
        src={"/img/torenafbeeldingen/" + props.image?.id + ".jpg"}
        alt={props.image?.title}
        className={"max-h-96"}
      />
      <p className={"text-lg font-bold mt-4"}>{props.image?.title}</p>
      <div className={"font-mono text-sm"}>
        <div className={"grid grid-cols-2 mt-2"}>
          <strong className={"font-bold mr-4"}>Date </strong>{" "}
          {props.image?.dateBegin} - {props.image?.dateEnd}
        </div>
        <div className={"grid grid-cols-2"}>
          <strong className={"font-bold  mr-4"}>Institutions </strong>{" "}
          {props.image?.institutions}
        </div>
        <div className={"grid grid-cols-2"}>
          <strong>Materials </strong> {props.image?.materials}
        </div>
        <div className={"grid grid-cols-2"}>
          <strong>Makers</strong> {props.image?.makers}
        </div>
        <div className={"grid grid-cols-2"}>
          <strong>Techniques</strong> {props.image?.techniques}
        </div>
        <div className={"mt-4"}>
          <p className={"italic"}>
            <a href={props.image?.url} target={"_blank"}>
              Permalink
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default ImagePreview;
