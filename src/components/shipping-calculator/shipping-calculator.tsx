import { useState } from "react";
import type { IAddressData } from "../../models/address";
import {
  useProductActions,
  useProductState,
} from "../../contexts/product-context";
import { updateQuery } from "../../utils/update-query";
import { formatZipcode } from "../../utils/format-zipcode";

export function ShippingCalculator() {
  const { selectedZipcode } = useProductState();
  const dispatch = useProductActions();
  const [address, setAddress] = useState<IAddressData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleZipcodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedZipcode = formatZipcode(e.target.value);
    dispatch({ type: "set_zipcode", payload: { zipcode: formattedZipcode } });

    if (address && formattedZipcode !== address.cep) {
      setAddress(null);
      setError("");
    }
  };

  async function checkZipcode() {
    const numericCEP = selectedZipcode.replace(/\D/g, "");

    if (numericCEP.length !== 8) {
      setError("CEP deve conter 8 dígitos");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await fetch(
        `https://viacep.com.br/ws/${numericCEP}/json/`
      );
      const data = await response.json();

      if (data.erro) {
        setError("CEP não encontrado");
        setAddress(null);
      } else {
        setAddress(data);
        updateQuery("zipcode", selectedZipcode);
      }
    } catch {
      setError("Erro ao consultar o CEP");
      setAddress(null);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-4 rounded-lg border border-gray-200 p-4">
      <h3 className="font-medium">Calcular Frete e Prazo de Entrega</h3>

      <div className="flex">
        <input
          type="text"
          value={selectedZipcode}
          onChange={handleZipcodeChange}
          placeholder="Digite seu CEP"
          maxLength={9}
          className="flex-1 rounded-l-md border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-emerald-500 focus:outline-none"
        />
        <button
          onClick={checkZipcode}
          disabled={isLoading}
          className="rounded-r-md bg-emerald-600 px-4 py-2 text-white transition-colors hover:bg-emerald-700 disabled:bg-emerald-300"
        >
          {isLoading ? "..." : "Buscar"}
        </button>
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}

      {address && (
        <div className="space-y-2 text-sm">
          <p className="font-medium">Endereço encontrado:</p>
          <p>{address.logradouro}</p>
          <p>{address.bairro}</p>
          <p>{`${address.localidade} - ${address.uf}`}</p>
          <p className="mt-2 font-medium text-emerald-600">
            Entrega disponível para este endereço
          </p>
          <p className="text-sm text-gray-600">
            Prazo estimado: 3-5 dias úteis
          </p>
        </div>
      )}

      <div className="text-xs text-gray-500">
        <a
          href="https://buscacepinter.correios.com.br/app/endereco/index.php"
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
        >
          Não sei meu CEP
        </a>
      </div>
    </div>
  );
}
