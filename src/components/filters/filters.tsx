import { Slider } from "@mui/material";
import React from "react";
import styles from "./filters.module.scss";
import SelectFilter from "./select-filter/select-filter";
import { institutionOptions, materialOptions } from "../../data/data";
import { techniqueOptions } from "../../data/data";

const Filters = (props: {}) => {
  const [yearRange, setYearRange] = React.useState<number[]>([1300, 2022]);
  const onYearRangeChange = (event: Event, newValue: number | number[]) => {
    setYearRange(newValue as number[]);
  };

  return (
    <>
      <p className={styles.filterTitle}>Material</p>
      <SelectFilter options={materialOptions} selectKey={"materials"} />

      <p className={`${styles.filterTitle} mt-6`}>Year range</p>
      <Slider
        value={yearRange}
        onChange={onYearRangeChange}
        min={1300}
        max={2022}
        valueLabelDisplay="auto"
      />

      <p className={`${styles.filterTitle} mt-6`}>Technique</p>
      <SelectFilter options={techniqueOptions} selectKey={"techniques"} />

      <p className={`${styles.filterTitle} mt-6`}>Institutions</p>
      <SelectFilter options={institutionOptions} selectKey={"institutions"} />
    </>
  );
};

export default Filters;
