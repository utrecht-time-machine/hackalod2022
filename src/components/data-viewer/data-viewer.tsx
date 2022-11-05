import React from "react";

import { ImageModel } from "../../models/image.model";

const DataViewer = (props: { images: ImageModel[] }) => {
  return (
    <div className={"text-white"}>
      {props.images.map((img) => {
        return (
          <div className={"mb-4"} key={img.id}>
            <img src={img.url} alt={img.title} className={"h-16"} />
            <p>{img.title}</p>
            <p>
              {img.dateBegin} - {img.dateEnd}
            </p>
            <p>{img.institutions}</p>
            <p>{img.makers}</p>
            <p>{img.materials}</p>
          </div>
        );
      })}
    </div>
  );
};

export default DataViewer;
