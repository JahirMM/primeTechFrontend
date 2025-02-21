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
}

function ProductDetailsManager({
  productData,
  setProductData,
}: ProductDetailsManagerProps) {
  return (
    <>
      <div className="mt-5">
        <label htmlFor="" className="block mb-3 text-sm">
          Nombre del producto
        </label>
        <input
          type="text"
          className="w-full px-3 py-2 text-sm border border-black rounded-lg"
          value={productData.name}
          onChange={(e) =>
            setProductData((prev) => ({ ...prev, name: e.target.value }))
          }
        />
      </div>
      <div className="mt-5">
        <label htmlFor="" className="block mb-3 text-sm">
          Descripcion
        </label>
        <textarea
          name=""
          id=""
          className="w-full h-32 px-3 py-2 text-sm border border-black rounded-lg resize-none"
          value={productData.description}
          onChange={(e) =>
            setProductData((prev) => ({ ...prev, description: e.target.value }))
          }
        ></textarea>
      </div>
    </>
  );
}

export default ProductDetailsManager;
