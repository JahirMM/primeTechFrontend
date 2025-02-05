function FeatureTableSkeleton() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full overflow-hidden text-sm rounded-lg">
        <tbody className="border border-gray-100">
          <tr className="bg-gray-100">
            <th className="p-3 font-medium text-left">
              <div className="h-4 rounded bg-skeletonBackground animate-pulse"></div>
            </th>
            <td className="p-3">
              <div className="h-4 rounded bg-skeletonBackground animate-pulse"></div>
            </td>
          </tr>
          <tr className="bg-white">
            <th className="p-3 font-medium text-left">
              <div className="h-4 rounded bg-skeletonBackground animate-pulse"></div>
            </th>
            <td className="p-3">
              <div className="h-4 rounded bg-skeletonBackground animate-pulse"></div>
            </td>
          </tr>
          <tr className="bg-gray-100">
            <th className="p-3 font-medium text-left">
              <div className="h-4 rounded bg-skeletonBackground animate-pulse"></div>
            </th>
            <td className="p-3">
              <div className="h-4 rounded bg-skeletonBackground animate-pulse"></div>
            </td>
          </tr>
          <tr className="bg-white">
            <th className="p-3 font-medium text-left">
              <div className="h-4 rounded bg-skeletonBackground animate-pulse"></div>
            </th>
            <td className="p-3">
              <div className="h-4 rounded bg-skeletonBackground animate-pulse"></div>
            </td>
          </tr>
          <tr className="bg-gray-100">
            <th className="p-3 font-medium text-left">
              <div className="h-4 rounded bg-skeletonBackground animate-pulse"></div>
            </th>
            <td className="p-3">
              <div className="h-4 rounded bg-skeletonBackground animate-pulse"></div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default FeatureTableSkeleton;
