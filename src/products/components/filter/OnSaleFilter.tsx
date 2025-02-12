import { SetStateAction } from "react";

interface OnSaleFilterProps {
  onSale: boolean | null;
  setOnSale: React.Dispatch<SetStateAction<boolean | null>>;
}

function OnSaleFilter({ onSale, setOnSale }: OnSaleFilterProps) {
  return (
    <div className="flex items-center mt-5 gap-x-3">
      <span className="text-xs">Productos en ofertas</span>
      <div className="space-x-2">
        <button
          className={`w-7 h-7 text-xs rounded-md border ${
            onSale
              ? "bg-primaryColor text-white border-primaryColor"
              : "bg-white text-black border-gray-600"
          }`}
          onClick={() => setOnSale(true)}
        >
          Si
        </button>
        <button
          className={`w-7 h-7 text-xs rounded-md border ${
            onSale === false
              ? "bg-primaryColor text-white border-primaryColor"
              : "bg-white text-black border-gray-600"
          }`}
          onClick={() => setOnSale(false)}
        >
          No
        </button>
      </div>
    </div>
  );
}

export default OnSaleFilter;
