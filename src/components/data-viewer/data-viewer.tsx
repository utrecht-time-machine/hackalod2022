import React from "react";

import { testSet } from "../../data/testSet";
import { DomTower } from "../dom-renderer/dom-renderer";
const DataViewer = (props: { domTower: DomTower }) => {
  return <p className={"text-white"}>{JSON.stringify(props.domTower)}</p>;
};

export default DataViewer;
