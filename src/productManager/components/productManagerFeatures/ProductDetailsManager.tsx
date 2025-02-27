interface ProductData {
  name: string;
  description: string;
  brand: string;
  stock: number;
  price: number;
  category: string;
}

interface ProductDetailsManagerProps {
  productData: ProductData;
  setProductData: React.Dispatch<React.SetStateAction<ProductData>>;
  isDisabled: boolean;
}

function ProductDetailsManager({
  productData,
  setProductData,
  isDisabled,
}: ProductDetailsManagerProps) {
  const handleNameChange = (value: string) => {
    if (value.length <= 100) {
      setProductData((prev) => ({ ...prev, name: value }));
    }
  };

  const handleDescriptionChange = (value: string) => {
    if (value.length <= 700) {
      setProductData((prev) => ({ ...prev, description: value }));
    }
  };
  return (
    <>
      <div className="mt-5">
        <label htmlFor="" className="block mb-3 text-sm">
          Nombre del producto
        </label>
        <div>
          <input
            type="text"
            className="w-full px-3 py-2 text-sm border border-black rounded-lg"
            value={productData.name}
            onChange={(e) => handleNameChange(e.target.value)}
            disabled={isDisabled}
          />
          <span className="block text-sm text-right text-gray-400">
            {" "}
            caracteres {productData.name.length}/100
          </span>
        </div>
      </div>
      <div className="mt-5">
        <label htmlFor="" className="block mb-3 text-sm">
          Descripcion
        </label>
        <div className="">
          <textarea
            name=""
            id=""
            className="w-full h-40 px-3 py-2 text-sm border border-black rounded-lg resize-none"
            value={productData.description}
            onChange={(e) => handleDescriptionChange(e.target.value)}
            disabled={isDisabled}
          ></textarea>
          <span className="block text-sm text-right text-gray-400">
            {" "}
            caracteres {productData.description.length}/700
          </span>
        </div>
      </div>
    </>
  );
}

export default ProductDetailsManager;
