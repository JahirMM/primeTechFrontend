import PlayArrowIcon from "@/icons/PlayArrowIcon";

interface CarouselContainerProps {
  children: React.ReactNode;
  listLength: number;
  listRef: React.RefObject<HTMLUListElement>;
}

function CarouselContainer({
  children,
  listRef,
  listLength,
}: CarouselContainerProps) {
  const scrollForward = () => {
    if (listRef.current) {
      listRef.current.scrollBy({ left: 240, behavior: "smooth" });
    }
  };

  const scrollBackward = () => {
    if (listRef.current) {
      listRef.current.scrollBy({ left: -240, behavior: "smooth" });
    }
  };
  return (
    <div className="relative">
      <button
        onClick={scrollBackward}
        className={`absolute left-0 z-10 p-2 -translate-y-1/2 bg-white border border-gray-200 rounded-full shadow-md top-1/2 ${
          listLength > 5 ? "" : "hidden"
        }`}
        aria-label="Desplazar hacia atrás"
      >
        <PlayArrowIcon className="rotate-180 text-primaryColor size-4" />
      </button>
      {children}
      <button
        onClick={scrollForward}
        className={`absolute right-0 z-10 p-2 -translate-y-1/2 bg-white border border-gray-200 rounded-full shadow-md top-1/2 ${
          listLength > 5 ? "" : "hidden"
        }`}
        aria-label="Desplazar hacia adelante"
      >
        <PlayArrowIcon className="text-primaryColor size-4" />
      </button>
    </div>
  );
}

export default CarouselContainer;
