import React, { useEffect, useState } from "react";
import Filters from "../filters/filters";
import DataViewer from "../data-viewer/data-viewer";
import { DomTower } from "../dom-renderer/dom-renderer";
import { testSet } from "../../data/testSet";
import { FilterService } from "../../services/filter-service";
import { useStateMachine } from "little-state-machine";
import { StateModel } from "../../models/state.model";
import { ImageModel } from "../../models/image.model";

const Layout = (props: {}) => {
  const { state, actions } = useStateMachine({});
  const getTextureImageUrls = (level: number): DomTower => {
    const filteredSet: ImageModel[] = testSet.filter((image) => {
      const imageIsInYearRange: boolean = FilterService.isImageInYearRange(
        image,
        Object.values((state as StateModel).yearRange)
      );
      return imageIsInYearRange;
    });

    return {
      level0: filteredSet, // 4 image URLs
      level1: filteredSet, // 4 image URLs
      level2: filteredSet, // 4 image URLs
    };
  };

  useEffect(() => {
    getTextureImageUrls(0);
  }, [state]);

  return (
    <div className={"grid grid-cols-6 h-screen"}>
      <div className={"col-span-4 bg-black p-4"}>
        <Filters></Filters>
        <DataViewer domTower={getTextureImageUrls(0)}></DataViewer>
      </div>
      <div className={"col-span-2 bg-slate-600 p-4"}>
        <p>Column</p>
        <img src="https://placekitten.com/400/300" alt="Placeholder" />
      </div>
    </div>
  );
};

export default Layout;
