import { ImageModel } from "../models/image.model";

export class FilterService {
  static isImageInYearRange = (
    image: ImageModel,
    yearRange: number[]
  ): boolean => {
    if (yearRange.length !== 2) {
      console.warn("Invalid year range", yearRange);
      return false;
    }

    if (image.dateBegin && image.dateEnd) {
      return image.dateBegin >= yearRange[0] && image.dateEnd <= yearRange[1];
    }
    if (image.dateBegin) {
      console.log("DATE BEGIN", image.dateBegin, yearRange);
      return image.dateBegin >= yearRange[0];
    }

    if (image.dateEnd) {
      return image.dateEnd <= yearRange[1];
    }

    console.warn("No date available for this image", image);
    return false;
  };
}
