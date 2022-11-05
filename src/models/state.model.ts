import { OptionModel } from "./option.model";
import { ImageModel } from "./image.model";

export interface StateModel {
  makers: OptionModel[];
  materials: OptionModel[];
  institutions: OptionModel[];
  techniques: OptionModel[];
  yearRange: number[];
  selectedImage: ImageModel;
}
