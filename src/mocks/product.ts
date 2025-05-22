import whiteShirtImage from "../assets/images/white.png";
import whiteShirtGallery02 from "../assets/images/white-2.png";
import blackShirtImage from "../assets/images/black.png";
import blackShirtGallery02 from "../assets/images/black-2.png";

import type { IProduct } from "../models/product";

export const product: IProduct = {
  id: 1,
  name: "Camiseta",
  price: 30,
  description: "Camiseta morderna e casual.",
  images: {
    white: { showCaseImages: [whiteShirtImage, whiteShirtGallery02] },
    black: { showCaseImages: [blackShirtImage, blackShirtGallery02] },
  },
  variants: {
    colors: [
      { id: 1, name: "Preto", value: "black" },
      { id: 2, name: "Branco", value: "white" },
    ],
    sizes: [
      { id: 1, name: "P" },
      { id: 2, name: "M" },
      { id: 3, name: "G" },
    ],
  },
};
