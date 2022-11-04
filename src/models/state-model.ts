import { OptionModel } from "./option-model";

export interface StateModel {
  materials: OptionModel[];
  institutions: OptionModel[];
  techniques: OptionModel[];
  yearRange: number[];
}
