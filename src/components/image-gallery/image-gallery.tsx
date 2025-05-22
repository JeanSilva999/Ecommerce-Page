import {
  useProductActions,
  useProductState,
} from "../../contexts/product-context";
import { updateQuery } from "../../utils/update-query";

export function ImageGallery() {
  const { currentProduct, selectedMainImage, selectedColor } =
    useProductState();
  const dispatch = useProductActions();
  const showCaseImages =
    currentProduct.images[selectedColor.value].showCaseImages;

  function onChangeMainImage(image: string) {
    dispatch({ type: "set_main_image", payload: { image } });
    updateQuery("showCaseImage", image);
  }

  return (
    <div className="space-y-4">
      <div className="relative aspect-square w-full overflow-hidden rounded-lg border border-gray-200">
        <img
          src={selectedMainImage || "/placeholder.svg"}
          alt="Imagem do produto"
          className="w-full object-cover"
        />
      </div>

      <div className="flex space-x-2 overflow-x-auto pb-2">
        {showCaseImages.map((image, index) => (
          <button
            key={index}
            onClick={() => onChangeMainImage(image)}
            className={`relative h-20 w-20 overflow-hidden rounded-md border-2 ${
              selectedMainImage === image
                ? "border-emerald-500"
                : "border-gray-200"
            }`}
          >
            <img
              src={image || "/placeholder.svg"}
              alt={`Miniatura ${index + 1}`}
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
