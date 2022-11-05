import React from "react";
import { ImageModel } from "../../models/image.model";

const ImagePreview = (props: { image: ImageModel }) => {
  return (
    <div className={"image-preview"}>
      <img
        src={"/img/torenafbeeldingen/" + props.image?.id + ".jpg"}
        alt={props.image?.title}
        className={"object-contain"}
      />
      <div className={"image-preview-text"}>
        <p className={"text-lg font-bold mt-4"}>
          {props.image?.title.length > 90
            ? props.image?.title.substring(0, 90) + "..."
            : props.image?.title}
        </p>
        <div className={"font-mono text-sm"}>
          <div className={"grid grid-cols-2 mt-2"}>
            <strong className={"font-bold mr-4"}>Jaar </strong>{" "}
            {props.image?.dateBegin} - {props.image?.dateEnd}
          </div>
          <div className={"grid grid-cols-2"}>
            <strong>Object type </strong> {props.image?.materials}
          </div>

          <div className={"grid grid-cols-2"}>
            <strong>Maker</strong> {props.image?.makers}
          </div>

          <div className={"grid grid-cols-2"}>
            <strong>Techniek</strong> {props.image?.techniques}
          </div>

          <div className={"grid grid-cols-2"}>
            <strong className={"font-bold  mr-4"}>Instelling </strong>{" "}
            {props.image?.institutions}
          </div>
          <div className={"mt-4"}>
            <p className={"italic"}>
              <a href={props.image?.url} target={"_blank"}>
                Permalink
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImagePreview;
