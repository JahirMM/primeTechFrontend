import AddCartIcon from "@/icons/AddCartIcon";
import HeartIcon from "@/icons/HeartIcon";

function ProductActionButtons() {
  const handleFavoriteProduct = (event: React.MouseEvent) => {
    event.stopPropagation();
    console.log("FAVORITO");
  };

  const handleAddToCart = (event: React.MouseEvent) => {
    event.stopPropagation();
    console.log("AGREGADO");
  };

  return (
    <div className="flex flex-col gap-3 absolute top-[10px] right-[5px] translate-x-[35px] transition-transform duration-500 ease-linear group-hover:translate-x-[0]">
      <span className="p-1 rounded-full cursor-pointer bg-secondaryColor">
        <AddCartIcon className="size-4" onClick={handleAddToCart} />
      </span>
      <span className="p-1 rounded-full cursor-pointer bg-secondaryColor">
        <HeartIcon className="size-4" onClick={handleFavoriteProduct}/>
      </span>
    </div>
  );
}

export default ProductActionButtons;
