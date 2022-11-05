import React, { useEffect } from "react";
import Filters from "../filters/filters";
import DataViewer from "../data-viewer/data-viewer";
import { FilterService } from "../../services/filter-service";
import { useStateMachine } from "little-state-machine";
import { DataService } from "../../services/data-service";
import ImagePreview from "../data-viewer/image-preview";
import DomRendererP5 from "../dom-renderer/dom-renderer-p5";

const Layout = (props: {}) => {
  const { state, actions } = useStateMachine({});

  useEffect(() => {
    // console.log(getData());
    console.log(state);
    FilterService.getFilteredImages(DataService.getImages(), state);
  }, [state]);

  useEffect(() => {
    console.log("Resetting LocalStorage...");
    localStorage.clear();
  }, []);

  return (
    <div className={"grid grid-cols-6 h-screen"}>
      <div className={"col-span-4 bg-black p-4"}>
        <div
          className={
            "scale-75 -bottom-8 absolute -left-8 bg-[rgba(255,255,255,0.5)] w-96 p-4 px-8 rounded"
          }
        >
          <Filters />
        </div>

        <DataViewer
          images={FilterService.getFilteredImages(
            DataService.getImages(),
            state
          )}
        />

        <DomRendererP5 />
      </div>
      <div className={"col-span-2 bg-slate-600 p-4 text-white"}>
        {/*  @ts-ignore */}
        <ImagePreview image={state.selectedImage} />
      </div>
    </div>
  );
};

export default Layout;
