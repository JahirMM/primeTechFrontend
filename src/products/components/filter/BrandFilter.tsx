import React, { SetStateAction, useState } from "react";

interface BrandFilterProps {
  brands: string[];
  searchBrand: string;
  setSearchBrand: React.Dispatch<SetStateAction<string>>;
}

function BrandFilter({
  brands,
  searchBrand,
  setSearchBrand,
}: BrandFilterProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const filteredBrands = brands.filter((brand) =>
    brand.toLowerCase().includes(searchBrand.toLowerCase())
  );

  const handleChangea = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchBrand(e.target.value);
    setIsFocused(true);
    setSelectedIndex(-1);
  };

  const handleSelect = (brand: string) => {
    setSearchBrand(brand);
    setSelectedIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (filteredBrands.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev < filteredBrands.length - 1 ? prev + 1 : 0
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev > 0 ? prev - 1 : filteredBrands.length - 1
      );
    } else if (e.key === "Enter" && selectedIndex >= 0) {
      e.preventDefault();
      handleSelect(filteredBrands[selectedIndex]);
      setIsFocused(false);
    } else if (e.key === "Escape") {
      setIsFocused(false);
      setSelectedIndex(-1);
    }
  };

  return (
    <div className="relative pb-5 mt-5 border-b border-b-gray-400">
      <label htmlFor="inputBrand" className="inline-block mb-3 text-xs">
        Marca
      </label>
      <input
        id="inputBrand"
        type="text"
        placeholder="Buscar marca..."
        value={searchBrand}
        onChange={(e) => handleChangea(e)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setTimeout(() => setIsFocused(false), 200)}
        onKeyDown={handleKeyDown}
        className="w-full p-2 mb-2 text-xs border rounded-lg"
      />
      {isFocused && filteredBrands.length > 0 && (
        <ul className="absolute z-[60] flex flex-col w-full gap-2 p-2 overflow-y-auto bg-white border border-gray-300 rounded-lg max-h-32">
          {filteredBrands.map((brand, index) => (
            <li
              key={brand}
              className={`p-1 text-xs cursor-pointer ${
                index === selectedIndex ? "bg-gray-300" : "hover:bg-gray-200"
              }`}
              onMouseDown={() => handleSelect(brand)}
            >
              {brand}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default BrandFilter;
