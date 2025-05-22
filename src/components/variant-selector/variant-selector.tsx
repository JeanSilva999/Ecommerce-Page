import {
  useProductActions,
  useProductState,
} from "../../contexts/product-context";
import type { IColor, ISize } from "../../models/product";
import { updateQuery } from "../../utils/update-query";

interface VariantSelectorProps {
  label: string;
  variant: "colors" | "sizes";
}

export function VariantSelector({ label, variant }: VariantSelectorProps) {
  const { currentProduct, selectedColor, selectedSize } = useProductState();
  const dispatch = useProductActions();

  function onChangeVariant(content: IColor | ISize) {
    switch (variant) {
      case "colors": {
        dispatch({ type: "set_color", payload: { color: content as IColor } });
        updateQuery("color", (content as IColor).value);
        updateQuery(
          "showCaseImage",
          currentProduct.images[(content as IColor).value].showCaseImages[0]
        );
        break;
      }
      case "sizes": {
        dispatch({ type: "set_size", payload: { size: content as ISize } });
        updateQuery("size", (content as ISize).name);
      }
    }
  }

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <div className="flex flex-wrap gap-2">
        {currentProduct.variants[variant].map((option) => (
          <button
            key={option.id}
            onClick={() => onChangeVariant(option)}
            className={`rounded-md border px-4 py-2 ${
              (variant === "colors" && selectedColor.id === option.id) ||
              (variant === "sizes" && selectedSize.id === option.id)
                ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                : "border-gray-300 hover:border-gray-400"
            }`}
            style={
              "value" in option && option.value
                ? {
                    backgroundColor:
                      option.value === "white" ? "#fff" : option.value,
                  }
                : {}
            }
          >
            {"value" in option && option.value ? (
              <span
                className={`block h-6 w-6 rounded-full ${option.value === "white" ? "border border-gray-300" : ""}`}
              ></span>
            ) : (
              option.name
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
