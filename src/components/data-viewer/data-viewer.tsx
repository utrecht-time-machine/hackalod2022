import React from "react";

import { ImageModel } from "../../models/image.model";
import { useStateMachine } from "little-state-machine";
import { updateSelectedImage } from "../../actions/actions";

const DataViewer = (props: { images: ImageModel[] }) => {
  // @ts-ignore
  const { state, actions } = useStateMachine({ updateSelectedImage });

  return (
    <div className={"text-white"}>
      {props.images.map((img) => {
        return (
          <div
            className={"mb-4 cursor-pointer"}
            key={img.id}
            onClick={() => {
              actions.updateSelectedImage(img);
            }}
          >
            <img src={img.url} alt={img.title} className={"h-16"} />
            <p>{img.title}</p>
            {/*<p>*/}
            {/*  {img.dateBegin} - {img.dateEnd}*/}
            {/*</p>*/}
            {/*<p>{img.institutions}</p>*/}
            {/*<p>{img.makers}</p>*/}
            {/*<p>{img.materials}</p>*/}
          </div>
        );
      })}
    </div>
  );
};

export default DataViewer;
