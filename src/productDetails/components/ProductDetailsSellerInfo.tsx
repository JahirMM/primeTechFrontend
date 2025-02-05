function ProductDetailsSellerInfo() {
  return (
    <div className="flex px-5 gap-x-2 md:mt-0 md:py-5">
      <img
        src="/images/home/img-home.svg"
        alt=""
        className="border border-gray-500 rounded-full size-12"
      />
      <div className="flex flex-col gap-y-2">
        <span className="text-sm">Raul Hernandez</span>
        <span className="text-xs text-gray-500">49 productos vendidos</span>
      </div>
    </div>
  );
}

export default ProductDetailsSellerInfo;
