export interface ImageModel {
  id: string;
  url: string;
  title: string;
  materials: string[];
  techniques: string[];
  institutions: string[];
  makers: string[];
  dateBegin: number;
  dateEnd?: number;
  layer0Coordinates: [number[], number[], number[], number[]];
  layer1Coordinates: [number[], number[], number[], number[]];
  layer2Coordinates: [number[], number[], number[], number[]];
  layer3Coordinates: [number[], number[], number[], number[]];
}
