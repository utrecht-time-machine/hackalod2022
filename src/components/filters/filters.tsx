import { Slider } from "@mui/material";
import React, { useEffect, useState } from "react";
import styles from "./filters.module.scss";
import SelectFilter from "./select-filter/select-filter";
import { FilterKey } from "../../models/filter-key";
import { useStateMachine } from "little-state-machine";
import { updateYearRange } from "../../actions/actions";
import { DataService } from "../../services/data-service";
import { OptionModel } from "../../models/option.model";

const Filters = (props: {}) => {
  // @ts-ignore
  const { state, actions } = useStateMachine({ updateYearRange });

  const [yearRange, setYearRange] = useState<number[]>([1300, 2022]);
  const onYearRangeChange = (event: Event, newValue: number | number[]) => {
    setYearRange(newValue as number[]);
    actions.updateYearRange(newValue as number[]);
  };

  const [materialOptions, setMaterialOptions] = useState<OptionModel[]>([]);
  const [institutionOptions, setInstitutionOptions] = useState<OptionModel[]>(
    []
  );
  const [techniqueOptions, setTechniqueOptions] = useState<OptionModel[]>([]);
  useEffect(() => {
    setMaterialOptions(
      DataService.getImageOptions(DataService.getImages(), "materials")
    );
    setTechniqueOptions(
      DataService.getImageOptions(DataService.getImages(), "techniques")
    );
    setInstitutionOptions(
      DataService.getImageOptions(DataService.getImages(), "institutions")
    );
  }, []);

  return (
    <>
      <p className={styles.filterTitle}>Material</p>
      <SelectFilter options={materialOptions} filterKey={FilterKey.materials} />

      <p className={`${styles.filterTitle} mt-6`}>Year range</p>
      <Slider
        value={yearRange}
        onChange={(event: Event, newValue: number | number[]) => {
          onYearRangeChange(event, newValue);
        }}
        min={1300}
        max={2022}
        valueLabelDisplay="auto"
      />

      <p className={`${styles.filterTitle} mt-6`}>Technique</p>
      <SelectFilter
        options={techniqueOptions}
        filterKey={FilterKey.techniques}
      />

      <p className={`${styles.filterTitle} mt-6`}>Institutions</p>
      <SelectFilter
        options={institutionOptions}
        filterKey={FilterKey.institutions}
      />
    </>
  );
};

export default Filters;
