import { OptionModel } from "../models/option.model";
import { StateModel } from "../models/state.model";
import { ImageModel } from "../models/image.model";

export function updateInstitutions(
  state: StateModel,
  institutions: OptionModel[]
) {
  return {
    ...state,
    institutions: { ...institutions },
  };
}

export function updateMaterials(state: StateModel, materials: OptionModel[]) {
  return {
    ...state,
    materials: { ...materials },
  };
}

export function updateMakers(state: StateModel, makers: OptionModel[]) {
  return {
    ...state,
    makers: { ...makers },
  };
}

export function updateTechniques(state: StateModel, techniques: OptionModel[]) {
  return {
    ...state,
    techniques: { ...techniques },
  };
}

export function updateYearRange(state: StateModel, yearRange: number[]) {
  return {
    ...state,
    yearRange: { ...yearRange },
  };
}

export function updateSelectedImage(state: StateModel, image: ImageModel) {
  return {
    ...state,
    selectedImage: { ...image },
  };
}
