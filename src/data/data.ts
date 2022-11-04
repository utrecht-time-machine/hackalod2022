import { OptionModel } from "../models/option.model";

export const materialOptions: readonly OptionModel[] = [
  { value: "painting", label: "Painting" },
  { value: "photograph", label: "Photograph" },
  { value: "test", label: "Test" },
];

export const techniqueOptions: readonly OptionModel[] = [
  { value: "pen", label: "Pen" },
  { value: "pencil", label: "Pencil" },
];

export const institutionOptions: readonly OptionModel[] = [
  { value: "utrecht-archives", label: "The Utrecht Archives" },
  { value: "boijmans", label: "Boijmans" },
];
