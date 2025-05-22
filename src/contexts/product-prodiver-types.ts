import type { IColor, IProduct, ISize } from "../models/product";

export type ProductStateType = {
  selectedColor: IColor;
  selectedSize: ISize;
  selectedMainImage: string;
  selectedZipcode: string;
  currentProduct: IProduct;
};

export type ProductActionsType =
  | { type: "set_color"; payload: { color: IColor } }
  | { type: "set_size"; payload: { size: ISize } }
  | { type: "set_main_image"; payload: { image: string } }
  | { type: "set_zipcode"; payload: { zipcode: string } }
  | {
      type: "set_initial_state";
      payolad: {
        state: Partial<
          Pick<
            ProductStateType,
            | "selectedColor"
            | "selectedSize"
            | "selectedMainImage"
            | "selectedZipcode"
          >
        >;
      };
    };
