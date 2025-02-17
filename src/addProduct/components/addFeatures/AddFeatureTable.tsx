interface AddFeatureTableProps {
  data: { [key: string]: string | boolean };
  setData: (data: any) => void;
}

function AddFeatureTable({ data, setData }: AddFeatureTableProps) {
  const handleChange = (key: string, value: string | boolean) => {
    setData((prev: any) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm border border-gray-200 rounded-lg">
        <tbody>
          {Object.entries(data).map(([key, value], index) => (
            <tr
              key={key}
              className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
            >
              <th className="p-3 font-medium text-left">{key}</th>
              <td className="p-3">
                {typeof value === "boolean" ? (
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={(e) => handleChange(key, e.target.checked)}
                  />
                ) : (
                  <input
                    type="text"
                    value={value}
                    className="w-full p-1 border border-gray-300 rounded"
                    onChange={(e) => handleChange(key, e.target.value)}
                  />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AddFeatureTable;
