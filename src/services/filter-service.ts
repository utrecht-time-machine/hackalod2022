import { ImageModel } from "../models/image.model";
import { DomTower } from "../components/dom-renderer/dom-renderer";
import { testSet } from "../data/testSet";
import { StateModel } from "../models/state.model";
import { GlobalState } from "little-state-machine";
import { DataService } from "./data-service";

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
      return image.dateBegin >= yearRange[0];
    }

    if (image.dateEnd) {
      return image.dateEnd <= yearRange[1];
    }

    console.warn("No date available for this image", image);
    return false;
  };

  static imagesHasKeys = (
    image: ImageModel,
    data: string[],
    key: string
  ): boolean => {
    if (!data || data.length === 0) {
      return true;
    }

    // @ts-ignore
    const imageData: string[] = image[key];
    if (!imageData) {
      return false;
    }
    return data.flat().some((e) => imageData.includes(e));
  };

  static getFilteredImages = (
    images: ImageModel[],
    state: GlobalState
  ): ImageModel[] => {
    const filteredImages: ImageModel[] = images.filter((image) => {
      const stateAsModel: StateModel = state as StateModel;
      const imageIsInYearRange: boolean = FilterService.isImageInYearRange(
        image,
        Object.values(stateAsModel.yearRange)
      );
      const imageMatchesInstitutionsFilter: boolean =
        FilterService.imagesHasKeys(
          image,
          Object.values(stateAsModel.institutions).map((e) => e.value),
          "institutions"
        );

      const imageMatchesMaterialsFilter: boolean = FilterService.imagesHasKeys(
        image,
        Object.values(stateAsModel.materials).map((e) => e.value),
        "materials"
      );

      const imageMatchesMakersFilter: boolean = FilterService.imagesHasKeys(
        image,
        Object.values(stateAsModel.makers).map((e) => e.value),
        "makers"
      );

      const imageMatchesTechniquesFilter: boolean = FilterService.imagesHasKeys(
        image,
        Object.values(stateAsModel.techniques).map((e) => e.value),
        "techniques"
      );
      return (
        imageIsInYearRange &&
        imageMatchesInstitutionsFilter &&
        imageMatchesMaterialsFilter &&
        imageMatchesTechniquesFilter &&
        imageMatchesMakersFilter
      );
    });

    return filteredImages;
  };

  //https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
  static shuffle(array: any[]) {
    let currentIndex = array.length,
      randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  }

  static getNineFilteredImages(filteredImages: ImageModel[]): ImageModel[] {
    if (!filteredImages || filteredImages.length === 0) {
      console.warn("No filtered images...");
      return [];
    }

    if (filteredImages.length < 9) {
      const missingImages = 9 - filteredImages.length;

      return filteredImages.concat(
        Array(missingImages).fill(filteredImages[0])
      );
    }

    const shuffledFilteredImages = FilterService.shuffle(filteredImages);
    return shuffledFilteredImages;
  }
}
