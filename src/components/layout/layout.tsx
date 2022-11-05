import React, { useEffect } from "react";
import Filters from "../filters/filters";
import { FilterService } from "../../services/filter-service";
import { useStateMachine } from "little-state-machine";
import { DataService } from "../../services/data-service";
import ImagePreview from "../data-viewer/image-preview";
import DomRendererP5 from "../dom-renderer/dom-renderer-p5";
import { updateSelectedImage } from "../../actions/actions";
import { ImageModel } from "../../models/image.model";
import { OptionModel } from "../../models/option.model";
import { StateModel } from "../../models/state.model";

const Layout = (props: {}) => {
  // @ts-ignore
  const { state, actions } = useStateMachine({ updateSelectedImage });

  // @ts-ignore
  const stateAsModel: StateModel = state as StateModel;
  const stateDeps = [
    stateAsModel.yearRange,
    stateAsModel.makers,
    stateAsModel.materials,
    stateAsModel.institutions,
    stateAsModel.techniques,
  ];
  useEffect(() => {
    // console.log(getData());

    const filteredImages = FilterService.getFilteredImages(
      DataService.getImages(),
      state
    );

    const images: ImageModel[] = DataService.getImages();
    const nineFilteredImages =
      FilterService.getNineFilteredImages(filteredImages);
    console.log("FILTER STATE", state, nineFilteredImages);

    // @ts-ignore
    window.dispatchEvent(
      new CustomEvent("onImageFilterUpdated", {
        detail: nineFilteredImages,
      })
    );

    window.addEventListener("onFaceClicked", (event: any) => {
      const imgId = event.detail;
      if (!imgId) {
        return;
      }
      console.log("CLICKED", imgId);
      const selectedImage = DataService.getImageById(imgId);
      if (selectedImage) {
        actions.updateSelectedImage(selectedImage);
      }
    });
  }, stateDeps);

  useEffect(() => {
    console.log("Resetting LocalStorage...");
    localStorage.clear();
  }, []);

  return (
    <div className={"grid grid-cols-6 h-screen"}>
      <div className={"col-span-4 p-4"}>
        <div
          className={
            "scale-75 -top-[3.5rem] absolute -left-[3rem] w-96 p-4 px-8 rounded"
          }
        >
          <Filters />
        </div>

        <DomRendererP5 />
      </div>
      <div className={"col-span-2 bg-[#240046] p-4 text-white"}>
        {/*  @ts-ignore */}
        <ImagePreview image={state.selectedImage} />
      </div>
    </div>
  );
};

export default Layout;
