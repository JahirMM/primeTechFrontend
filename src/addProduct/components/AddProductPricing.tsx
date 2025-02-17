import { SetStateAction } from "react";

import { ProductRequestInterface } from "@/addProduct/interfaces/productRequestInterface";

interface AddProductPricingProps {
  onUpdate: <K extends keyof ProductRequestInterface>(
    field: K,
    value: ProductRequestInterface[K]
  ) => void;
  deviceType: "mobile" | "laptop" | "other" | "";
  setDeviceType: React.Dispatch<
    SetStateAction<"mobile" | "laptop" | "other" | "">
  >;
}

function AddProductPricing({
  onUpdate,
  deviceType,
  setDeviceType,
}: AddProductPricingProps) {
  const handleDeviceTypeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedDevice = event.target.value as "mobile" | "laptop" | "other";
    setDeviceType(selectedDevice);

    if (selectedDevice === "laptop" || selectedDevice === "other") {
      onUpdate("category", selectedDevice);
    } else {
      onUpdate("category", "celular");
    }
  };

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    onUpdate("category", event.target.value);
  };

  return (
    <div className="grid grid-cols-2 gap-3 mt-5 md:grid-cols-3">
      <div className="flex flex-col gap-2">
        <label className="text-sm">Tipo</label>
        <select
          className="p-1 border border-black rounded-lg"
          value={deviceType}
          onChange={handleDeviceTypeChange}
        >
          <option value="">Seleccionar</option>
          <option value="mobile">Móvil</option>
          <option value="laptop">Laptop</option>
          <option value="other">Otro</option>
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm">Categoría</label>
        {deviceType === "mobile" ? (
          <select
            className="p-1 border border-black rounded-lg"
            onChange={handleCategoryChange}
          >
            <option value="celular">Celular</option>
            <option value="tablet">Tablet</option>
          </select>
        ) : (
          <input
            type="text"
            className="px-3 py-2 text-sm bg-gray-200 border border-black rounded-lg"
            value={deviceType}
            disabled
          />
        )}
      </div>
      <div className="flex flex-col col-start-1 col-end-3 gap-2 md:col-start-3 md:col-end-4">
        <label className="text-sm">Marca</label>
        <input
          type="text"
          className="px-3 py-2 text-sm border border-black rounded-lg"
          onChange={(e) => onUpdate("brand", e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm">Precio</label>
        <input
          type="number"
          className="px-3 py-2 text-sm border border-black rounded-lg"
          onChange={(e) => onUpdate("price", Number(e.target.value))}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm">Stock</label>
        <input
          type="number"
          className="px-3 py-2 text-sm border border-black rounded-lg"
          onChange={(e) => onUpdate("stock", Number(e.target.value))}
        />
      </div>
    </div>
  );
}

export default AddProductPricing;
