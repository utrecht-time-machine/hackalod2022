// @ts-nocheck

import React, { useEffect } from "react";
import Select, { ActionMeta } from "react-select";
import makeAnimated from "react-select/animated";
import { useStateMachine } from "little-state-machine";
import {
  updateInstitutions,
  updateMaterials,
  updateTechniques,
} from "../../../actions/actions";
import { OptionModel } from "../../../models/option.model";
import { FilterKey } from "../../../models/filter-key";

const animatedComponents = makeAnimated();

const SelectFilter = (props: {
  options: readonly OptionModel[];
  filterKey: FilterKey;
}) => {
  const onChange = (
    options: readonly OptionModel[],
    actionMeta: ActionMeta<OptionModel>
  ) => {
    if (props.filterKey === FilterKey.institutions) {
      // @ts-ignore
      actions.updateInstitutions(options);
    } else if (props.filterKey === FilterKey.materials) {
      // @ts-ignore
      actions.updateMaterials(options);
    } else if (props.filterKey === FilterKey.techniques) {
      // @ts-ignore
      actions.updateTechniques(options);
    }
  };

  const { state, actions } = useStateMachine({
    updateInstitutions,
    updateMaterials,
    updateTechniques,
  });

  useEffect(() => {}, [state]);

  return (
    <Select
      closeMenuOnSelect={false}
      components={animatedComponents}
      isMulti
      options={props.options}
      onChange={(
        option: readonly OptionModel[],
        actionMeta: ActionMeta<OptionModel>
      ) => {
        onChange(option, actionMeta);
      }}
    />
  );
};

export default SelectFilter;
