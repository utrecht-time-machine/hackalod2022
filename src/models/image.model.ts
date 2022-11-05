export interface ImageModel {
  id: string;
  url: string;
  title: string;
  makers?: string[];
  materials?: string[];
  techniques?: string[];
  institutions?: string[];
  dateBegin?: number;
  dateEnd?: number;
  layer0Coordinates?: { x: number; y: number; width: number; height: number };
  layer1Coordinates?: { x: number; y: number; width: number; height: number };
  layer2Coordinates?: { x: number; y: number; width: number; height: number };
  layer3Coordinates?: { x: number; y: number; width: number; height: number };
}
