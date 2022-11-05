import { createMuiTheme, Slider, ThemeProvider } from "@mui/material";
import React, { useEffect, useState } from "react";
import styles from "./filters.module.scss";
import SelectFilter from "./select-filter/select-filter";
import { FilterKey } from "../../models/filter-key";
import { useStateMachine } from "little-state-machine";
import { updateYearRange } from "../../actions/actions";
import { DataService } from "../../services/data-service";
import { OptionModel } from "../../models/option.model";
//
// const themeOptions: any = {
//   overrides: {
//     MuiSlider: {
//       thumb: {
//         color: "yellow",
//       },
//       track: {
//         color: "red",
//       },
//       rail: {
//         color: "black",
//       },
//     },
//   },
// };
// const muiTheme: any = createMuiTheme(themeOptions);

const Filters = (props: {}) => {
  // @ts-ignore
  const { state, actions } = useStateMachine({ updateYearRange });

  const [yearRange, setYearRange] = useState<number[]>([1300, 2022]);
  const onYearRangeChange = (event: Event, newValue: number | number[]) => {
    setYearRange(newValue as number[]);
    actions.updateYearRange(newValue as number[]);
  };

  const [materialOptions, setMaterialOptions] = useState<OptionModel[]>([]);
  const [makerOptions, setMakerOptions] = useState<OptionModel[]>([]);
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
    setMakerOptions(
      DataService.getImageOptions(DataService.getImages(), "makers")
    );
  }, []);

  return (
    <div
      className={"opacity-30 hover:opacity-90 duration-500 transition-opacity"}
    >
      <p className={`${styles.filterTitle}`}>Jaar</p>
      <div className={"px-2 saturate-0 brightness-[1.4]"}>
        <Slider
          value={yearRange}
          onChange={(event: Event, newValue: number | number[]) => {
            onYearRangeChange(event, newValue);
          }}
          min={1300}
          max={2022}
          valueLabelDisplay="auto"
        />
      </div>

      <p className={styles.filterTitle}>Object type</p>
      <SelectFilter options={materialOptions} filterKey={FilterKey.materials} />

      <p className={styles.filterTitle}>Maker</p>
      <SelectFilter options={makerOptions} filterKey={FilterKey.makers} />

      <p className={`${styles.filterTitle}`}>Techniek</p>
      <SelectFilter
        options={techniqueOptions}
        filterKey={FilterKey.techniques}
      />

      <p className={`${styles.filterTitle}`}>Instelling</p>
      <SelectFilter
        options={institutionOptions}
        filterKey={FilterKey.institutions}
      />

      {/*<p>{JSON.stringify(state)}</p>*/}
    </div>
  );
};

export default Filters;
