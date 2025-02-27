function ProductManagerPageSkeleton() {
  return (
    <div>
      <div className="flex justify-center m-auto mb-10 cursor-pointer">
        <div className="w-64 h-64 bg-gray-100 border border-gray-500 rounded-xl animate-pulse"></div>
      </div>
      <div className="flex flex-wrap justify-around gap-2">
        <div className="bg-gray-100 border border-gray-500 rounded-lg cursor-pointer size-14 animate-pulse"></div>
        <div className="bg-gray-100 border border-gray-500 rounded-lg cursor-pointer size-14 animate-pulse"></div>
        <div className="bg-gray-100 border border-gray-500 rounded-lg cursor-pointer size-14 animate-pulse"></div>
        <div className="bg-gray-100 border border-gray-500 rounded-lg cursor-pointer size-14 animate-pulse"></div>
      </div>
      <div className="w-full mt-10 bg-gray-100 rounded-lg h-44 animate-pulse"></div>
      <div className="w-full mt-5 bg-gray-100 rounded-lg h-44 animate-pulse"></div>
    </div>
  );
}

export default ProductManagerPageSkeleton;
