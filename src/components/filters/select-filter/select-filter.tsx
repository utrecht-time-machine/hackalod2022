import React from "react";
import Select, { ActionMeta } from "react-select";
import makeAnimated from "react-select/animated";
import { StateContext } from "../../../App";
import { OptionModel } from "../../../models/option-model";
import { StateModel } from "../../../models/state-model";

const animatedComponents = makeAnimated();

const SelectFilter = (props: {
  options: readonly OptionModel[];
  selectKey: string;
}) => {
  const onMaterialChange = (
    options: readonly OptionModel[],
    actionMeta: ActionMeta<OptionModel>,
    state: StateModel
  ) => {
    if (!(props.selectKey in state)) {
      console.warn("Could not find key", props.selectKey, "in state", state);
      return;
    }

    // @ts-ignore
    state[props.selectKey] = options;
  };

  return (
    <StateContext.Consumer>
      {(state) => (
        <Select
          closeMenuOnSelect={false}
          components={animatedComponents}
          isMulti
          options={props.options}
          onChange={(
            option: readonly OptionModel[],
            actionMeta: ActionMeta<OptionModel>
          ) => {
            onMaterialChange(option, actionMeta, state);
          }}
        />
      )}
    </StateContext.Consumer>
  );
};

export default SelectFilter;
