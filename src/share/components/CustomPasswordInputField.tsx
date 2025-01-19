import React, { forwardRef, useState } from "react";

import EyesSlashIcon from "@/icons/EyesSlashIcon";
import EyesIcon from "@/icons/EyesIcon";

interface CustomPasswordInputFieldProps {
  id: string;
  name: string;
  label: string;
  required: boolean;
  autoComplete?: string;
  defaultValue?: string;
  placeholder: string;
  classContainer?: string;
  classInput?: string;
  classInputGroup?: string;
  onChange?: () => void;
}

function CustomPasswordInputField(
  {
    id,
    name,
    label,
    required = false,
    autoComplete = "off",
    defaultValue = "",
    placeholder = "",
    classContainer = "",
    classInput = "",
    classInputGroup = "",
    onChange,
  }: CustomPasswordInputFieldProps,
  ref: React.Ref<HTMLInputElement>
) {
  const [showPassword, setShowPassword] = useState(false);

  const handlePassword = () => {
    setShowPassword((showPassword) => !showPassword);
  };

  return (
    <div className={`flex flex-col gap-2 ${classContainer}`}>
      <label htmlFor={id} className="text-xs">
        {label}
      </label>
      <div
        className={`flex items-center p-2 border border-gray-500 rounded-xl gap-x-2 ${classInputGroup}`}
      >
        <input
          id={id}
          name={name}
          type={showPassword ? "text" : "password"}
          required={required}
          autoComplete={autoComplete}
          defaultValue={defaultValue}
          placeholder={placeholder}
          className={`flex-1 text-sm placeholder:text-xs focus:outline-none ${classInput}`}
          ref={ref}
          onChange={onChange}
        />
        {showPassword ? (
          <EyesIcon className="size-5" onClick={handlePassword} />
        ) : (
          <EyesSlashIcon className="size-5" onClick={handlePassword} />
        )}
      </div>
    </div>
  );
}

const ForwardedCustomPasswordInputField = forwardRef(CustomPasswordInputField);

ForwardedCustomPasswordInputField.displayName = "CustomPasswordInputField";

export default ForwardedCustomPasswordInputField;
