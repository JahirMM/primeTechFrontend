import FilterIcon from "@/icons/FilterIcon";
import SearchIcon from "@/icons/SearchIcon";
import XmarkIcon from "@/icons/XmarkIcon";

interface NameFilterProps {
  searchName: string;
  setSearchName: (value: string) => void;
  handleSearch: () => void;
  showFilter: boolean;
  toggleFilter: () => void;
}

function NameFilter({
  searchName,
  setSearchName,
  handleSearch,
  showFilter,
  toggleFilter,
}: NameFilterProps) {
  return (
    <section className="bg-white px-5 fixed flex items-center z-[70] w-full h-[52px] md:px-40 lg:px-60">
      <div className="flex items-center w-full gap-x-4">
        {showFilter ? (
          <XmarkIcon
            className="cursor-pointer text-primaryColor size-6 lg:hidden"
            onClick={toggleFilter}
          />
        ) : (
          <FilterIcon
            className="cursor-pointer text-primaryColor size-5 lg:hidden"
            onClick={toggleFilter}
          />
        )}
        <input
          type="text"
          className="flex-1 p-2 bg-white border border-gray-400 rounded-xl"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        <SearchIcon
          className="cursor-pointer size-5 text-primaryColor"
          onClick={handleSearch}
        />
      </div>
    </section>
  );
}

export default NameFilter;
