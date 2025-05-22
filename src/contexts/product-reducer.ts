import type {
  ProductActionsType,
  ProductStateType,
} from "./product-prodiver-types";

export function productReducer(
  state: ProductStateType,
  action: ProductActionsType
): ProductStateType {
  switch (action.type) {
    case "set_zipcode": {
      return { ...state, selectedZipcode: action.payload.zipcode };
    }
    case "set_color": {
      const newSelectedImage =
        state.currentProduct.images[action.payload.color.value]
          .showCaseImages[0];

      return {
        ...state,
        selectedColor: action.payload.color,
        selectedMainImage: newSelectedImage,
      };
    }
    case "set_size": {
      return { ...state, selectedSize: action.payload.size };
    }
    case "set_main_image": {
      return { ...state, selectedMainImage: action.payload.image };
    }
    case "set_initial_state": {
      const {
        selectedColor,
        selectedMainImage,
        selectedSize,
        selectedZipcode,
      } = action.payolad.state;
      const newState = { ...state };
      if (selectedColor) {
        newState.selectedColor = selectedColor;
      }
      if (selectedMainImage) {
        newState.selectedMainImage = selectedMainImage;
      }
      if (selectedSize) {
        newState.selectedSize = selectedSize;
      }

      if (selectedZipcode) {
        newState.selectedZipcode = selectedZipcode;
      }

      return newState;
    }
    default: {
      return { ...state };
    }
  }
}
