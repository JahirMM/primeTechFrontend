import { FeatureData } from "@/productDetails/interfaces/featureDataInterface";

interface FeatureTableProps {
  headers: string[];
  data: FeatureData | null;
}

function FeatureTable({ headers, data }: FeatureTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full overflow-hidden text-sm rounded-lg">
        <tbody className="border border-gray-100">
          {headers.map((header, index) => (
            <tr key={index} className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}>
              <th className="p-3 font-medium text-left">{header}</th>
              <td className="p-3">{data?.[header] ?? "N/A"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default FeatureTable;
