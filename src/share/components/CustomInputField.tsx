import React, { forwardRef } from "react";

interface CustomInputFieldProps {
  id: string;
  name: string;
  label: string;
  type: string;
  required  : boolean;
  autoComplete?: string;
  defaultValue?: string;
  placeholder: string;
  classContainer?: string;
  classInput?: string;
  disabled?: boolean;
  onInput?: (event: React.FormEvent<HTMLInputElement>) => void;
}

function CustomInputField(
  {
    id,
    name,
    label,
    type,
    required = false,
    autoComplete = "off",
    defaultValue = "",
    placeholder = "",
    classContainer = "",
    classInput = "",
    disabled = false,
    onInput,
  }: CustomInputFieldProps,
  ref: React.Ref<HTMLInputElement>
) {
  return (
    <div className={`flex flex-col gap-2 ${classContainer}`}>
      <label htmlFor={id} className="text-xs">
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        defaultValue={defaultValue}
        placeholder={placeholder}
        className={`text-sm p-2 border border-gray-500 rounded-xl placeholder:text-xs focus:outline-none ${classInput}`}
        ref={ref}
        onInput={onInput}
        disabled={disabled}
      />
    </div>
  );
}

const ForwardedCustomInputField = forwardRef(CustomInputField);

ForwardedCustomInputField.displayName = "CustomInputField";

export default ForwardedCustomInputField;
