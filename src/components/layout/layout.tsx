import React, { useEffect } from "react";
import Filters from "../filters/filters";
import DataViewer from "../data-viewer/data-viewer";
import { testSet } from "../../data/testSet";
import { FilterService } from "../../services/filter-service";
import { useStateMachine } from "little-state-machine";
import { DataService } from "../../services/data-service";

const Layout = (props: {}) => {
  const { state, actions } = useStateMachine({});

  useEffect(() => {
    // console.log(getData());
    FilterService.getFilteredImages(DataService.getImages(), state);
  }, [state]);

  useEffect(() => {
    console.log("Resetting LocalStorage...");
    localStorage.clear();
  }, []);

  return (
    <div className={"grid grid-cols-6 h-screen"}>
      <div className={"col-span-4 bg-black p-4"}>
        <Filters />
      </div>
      <div className={"col-span-2 bg-slate-600 p-4"}>
        <DataViewer
          images={FilterService.getFilteredImages(
            DataService.getImages(),
            state
          )}
        />
      </div>
    </div>
  );
};

export default Layout;
