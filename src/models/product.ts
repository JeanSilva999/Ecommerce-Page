export interface IProduct {
  id: number;
  name: string;
  price: number;
  description: string;
  images: IImage;
  variants: {
    colors: IColor[];
    sizes: ISize[];
  };
}

export interface IImage {
  [key: string]: { showCaseImages: string[] };
}

export interface IColor {
  id: number;
  name: string;
  value: string;
}

export interface ISize {
  id: number;
  name: string;
}
