import { useProductState } from "../../contexts/product-context";

export function ProductInfo() {
  const { currentProduct } = useProductState();
  return (
    <div className="space-y-2">
      <h1 className="text-2xl font-bold">{currentProduct.name}</h1>
      <p className="text-xl font-semibold text-emerald-600">
        {new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(currentProduct.price)}
      </p>
      <p className="text-gray-600">{currentProduct.description}</p>
    </div>
  );
}
