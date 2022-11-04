import React from "react";
import Select, { ActionMeta } from "react-select";
import makeAnimated from "react-select/animated";
import { materialOptions } from "../../data/data";
import { MaterialModel } from "../../models/material-model";

const animatedComponents = makeAnimated();

const Filters = (props: {}) => {
  const handleChange = (
    option: readonly MaterialModel[],
    actionMeta: ActionMeta<MaterialModel>
  ) => {
    console.log(option);
  };

  return (
    <>
      <p className={"text-2xl font-bold text-white"}>Material</p>
      <Select
        closeMenuOnSelect={false}
        components={animatedComponents}
        isMulti
        options={materialOptions}
        onChange={handleChange}
      />
    </>
  );
};

export default Filters;
