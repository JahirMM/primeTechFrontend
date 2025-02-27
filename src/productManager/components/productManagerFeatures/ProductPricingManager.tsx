import { useCallback } from "react";

interface ProductData {
  name: string;
  description: string;
  brand: string;
  stock: number;
  price: number;
  category: string;
}

interface ProductPricingManagerProps {
  productData: ProductData;
  setProductData: React.Dispatch<React.SetStateAction<ProductData>>;
  deviceType: "mobile" | "laptop" | "other" | "";
  setDeviceType: React.Dispatch<
    React.SetStateAction<"mobile" | "laptop" | "other" | "">
  >;
  isDisabled: boolean;
}

function ProductPricingManager({
  productData,
  setProductData,
  deviceType,
  setDeviceType,
  isDisabled,
}: ProductPricingManagerProps) {
  const onUpdate = useCallback(
    (field: keyof ProductData, value: string | number) => {
      setProductData((prev) => ({
        ...prev,
        [field]:
          field === "price" || field === "stock"
            ? value === ""
              ? ""
              : Number(value)
            : value,
      }));
    },
    [setProductData]
  );
  const handleBrandChange = (value: string) => {
    if (value.length <= 50) {
      setProductData((prev) => ({ ...prev, brand: value }));
    }
  };

  const handleDeviceTypeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedDevice = event.target.value as "mobile" | "laptop" | "other";
    setDeviceType(selectedDevice);

    onUpdate(
      "category",
      selectedDevice === "mobile" ? "celular" : selectedDevice
    );
  };

  return (
    <div className="grid grid-cols-2 gap-3 mt-5 md:grid-cols-3">
      <div className="flex flex-col gap-2">
        <label className="text-sm">Tipo</label>
        <select
          className="p-1 border border-black rounded-lg"
          value={deviceType}
          onChange={handleDeviceTypeChange}
          disabled={isDisabled}
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
            value={productData.category}
            onChange={(e) => onUpdate("category", e.target.value)}
            disabled={isDisabled}
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
        <div>
          <input
            type="text"
            className="w-full px-3 py-2 text-sm border border-black rounded-lg"
            value={productData.brand}
            onChange={(e) => handleBrandChange(e.target.value)}
            disabled={isDisabled}
          />
          <span className="block text-sm text-right text-gray-400">
            caracteres {productData.brand.length}/50
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm">Precio</label>
        <input
          type="number"
          className="px-3 py-2 text-sm border border-black rounded-lg"
          value={productData.price === 0 ? "" : productData.price}
          onChange={(e) => onUpdate("price", e.target.value)}
          disabled={isDisabled}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm">Stock</label>

        <input
          type="number"
          className="px-3 py-2 text-sm border border-black rounded-lg"
          value={productData.stock === 0 ? "" : productData.stock}
          onChange={(e) => onUpdate("stock", e.target.value)}
          disabled={isDisabled}
        />
      </div>
    </div>
  );
}

export default ProductPricingManager;
