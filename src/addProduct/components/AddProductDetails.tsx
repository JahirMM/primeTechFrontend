interface ProductData {
  name: string;
  description: string;
  brand: string;
  stock: number;
  price: number;
  category: string;
}

interface AddProductDetailsProps {
  onUpdate: <K extends keyof ProductData>(
    field: K,
    value: ProductData[K]
  ) => void;
}

function AddProductDetails({ onUpdate }: AddProductDetailsProps) {
  return (
    <>
      <div className="mt-5">
        <label htmlFor="" className="block mb-3 text-sm">
          Nombre del producto
        </label>
        <input
          type="text"
          className="w-full px-3 py-2 text-sm border border-black rounded-lg"
          onChange={(e) => onUpdate("name", e.target.value)}
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
          onChange={(e) => onUpdate("description", e.target.value)}
        ></textarea>
      </div>
    </>
  );
}

export default AddProductDetails;
