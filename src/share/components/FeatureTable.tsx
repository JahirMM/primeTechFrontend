import PenIcon from "@/icons/PenIcon";

interface FeatureTableProps {
  data: Record<string, string | boolean>;
  setData: (
    data: (
      prev: Record<string, string | boolean>
    ) => Record<string, string | boolean>
  ) => void;
  isDisabled: boolean;
  setDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  fields: {
    label: string;
    key: string;
    type: "text" | "number" | "checkbox";
    validation?: (value: string) => string;
  }[];
  title: string;
  manageFeature: () => void;
  handleCancel: () => void;
}

function FeatureTable({
  data,
  setData,
  isDisabled,
  setDisabled,
  fields,
  title,
  manageFeature,
  handleCancel,
}: FeatureTableProps) {
  const handleChange = (key: string, value: string | boolean) => {
    const field = fields.find((f) => f.key === key);

    let newValue = value;
    if (typeof value === "string" && field?.validation) {
      newValue = field.validation(value);
    }

    setData((prev) => ({
      ...prev,
      [key]: newValue,
    }));
  };

  const handleInputChange = (
    key: string,
    type: string,
    value: string | boolean
  ) => {
    let newValue: string | boolean = value;

    if (type === "checkbox") {
      newValue = Boolean(value);
    } else if (type === "number") {
      newValue = value === "" ? "" : String(value);
    }

    handleChange(key, newValue);
  };

  return (
    <section>
      <div className="flex items-center justify-between my-6">
        <h2 className="text-lg font-semibold">{title}</h2>
        {!isDisabled && (
          <div className="flex flex-col items-center gap-4 md:flex-row">
            <button
              className="px-2 py-1 text-xs text-white rounded-lg bg-primaryColor"
              onClick={manageFeature}
            >
              confirmar
            </button>
            <button
              className="px-2 py-1 text-xs transition duration-200 border border-gray-500 rounded-lg hover:border-primaryColor hover:text-white hover:bg-primaryColor"
              onClick={() => handleCancel()}
            >
              cancelar
            </button>
          </div>
        )}
        {isDisabled && (
          <PenIcon
            className="size-4 text-primaryColor cursor-pointer"
            onClick={() => setDisabled(false)}
          />
        )}
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm border border-gray-200 rounded-lg">
          <tbody>
            {fields.map(({ label, key, type }) => (
              <tr key={key} className="even:bg-gray-100 odd:bg-white">
                <th className="p-3 font-medium text-left">{label}</th>
                <td className="p-3">
                  <input
                    type={type}
                    value={
                      type === "checkbox" ? undefined : String(data[key] ?? "")
                    }
                    checked={
                      type === "checkbox" ? Boolean(data[key]) : undefined
                    }
                    className="w-full p-1 border border-gray-300 rounded"
                    onChange={(e) =>
                      handleInputChange(
                        key,
                        type,
                        type === "checkbox" ? e.target.checked : e.target.value
                      )
                    }
                    disabled={isDisabled}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default FeatureTable;
