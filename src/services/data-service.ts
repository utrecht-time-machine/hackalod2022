import { testSet } from "../data/testSet";
import { ImageModel } from "../models/image.model";
import { OptionModel } from "../models/option.model";

export class DataService {
  static getImages = (): ImageModel[] => {
    return testSet;
  };

  static getImageOptions = (
    images: ImageModel[],
    key: string
  ): OptionModel[] => {
    const optionIds: string[] = Array.from(
      new Set(
        images.map((img) => {
          // @ts-ignore
          return img[key];
        })
      )
    ).flat();

    return optionIds.map((id) => {
      return { label: id, value: id };
    });
  };

  static getImageById = (imageId: string): ImageModel | null => {
    if (!imageId) {
      return null;
    }
    const filteredImages: ImageModel[] = DataService.getImages().filter(
      (img) => img.id === imageId
    );

    if (!filteredImages || filteredImages.length <= 0) {
      console.warn("Could not find image with ID", imageId);
      return null;
    }

    return filteredImages[0];
  };
}
