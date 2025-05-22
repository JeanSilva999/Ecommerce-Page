import { ImageGallery } from "./components/image-gallery";
import { ProductInfo } from "./components/product-info";
import { VariantSelector } from "./components/variant-selector";
import { ShippingCalculator } from "./components/shipping-calculator";

export default function ProductPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <ImageGallery />

        <div className="space-y-6">
          <ProductInfo />

          <div className="space-y-4">
            <VariantSelector variant="colors" label="Cor" />
            <VariantSelector variant="sizes" label="Tamanho" />
          </div>

          <ShippingCalculator />

          <button className="w-full rounded-lg bg-emerald-600 px-6 py-3 font-medium text-white transition-colors hover:bg-emerald-700">
            Adicionar ao Carrinho
          </button>
        </div>
      </div>
    </div>
  );
}
