import {
  createContext,
  use,
  useLayoutEffect,
  useReducer,
  type Dispatch,
  type PropsWithChildren,
} from "react";
import { product } from "../mocks/product";
import { productReducer } from "./product-reducer";
import type {
  ProductActionsType,
  ProductStateType,
} from "./product-prodiver-types";

const ProductState = createContext<ProductStateType>(
  createProductProviderState()
);
const ProductActions = createContext<Dispatch<ProductActionsType>>(() => null);

export function createProductProviderState(
  partial?: Partial<ProductStateType>
) {
  const initialState = {
    selectedSize: product.variants.sizes[0],
    selectedColor: product.variants.colors[1],
    selectedMainImage: product.images["white"].showCaseImages[0],
    selectedZipcode: "",
    currentProduct: product,
  };
  return { ...initialState, ...partial };
}

export function ProductProvider({ children }: PropsWithChildren) {
  const [state, dispatch] = useReducer(
    productReducer,
    createProductProviderState()
  );

  useLayoutEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const queryColor = state.currentProduct.variants.colors.find(
      (color) => color.value === urlParams.get("color")
    );
    const querySize = state.currentProduct.variants.sizes.find(
      (color) => color.name === urlParams.get("size")
    );

    const queryZipcode = urlParams.get("zipcode") ?? "";

    const queryImage = state.currentProduct.images[
      queryColor?.value ?? "white"
    ]?.showCaseImages.find((image) => image === urlParams.get("showCaseImage"));

    dispatch({
      type: "set_initial_state",
      payolad: {
        state: createProductProviderState({
          selectedColor: queryColor,
          selectedSize: querySize,
          selectedMainImage: queryImage,
          selectedZipcode: queryZipcode,
        }),
      },
    });
  }, []);

  return (
    <ProductState value={state}>
      <ProductActions value={dispatch}>{children}</ProductActions>
    </ProductState>
  );
}

export function useProductState(): ProductStateType {
  return use(ProductState);
}

export function useProductActions(): Dispatch<ProductActionsType> {
  return use(ProductActions);
}
