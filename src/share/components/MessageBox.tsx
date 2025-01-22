"use client";

import { useRouter } from "next/navigation";

interface MessageBoxProps {
  title: string;
  description: string;
  buttonLabel: string;
  onButtonClick?: () => void;
  redirectPath?: string;
}

function MessageBox({
  title,
  description,
  buttonLabel,
  onButtonClick,
  redirectPath,
}: MessageBoxProps) {
  const router = useRouter();

  const handleClick = () => {
    if (redirectPath) {
      router.push(redirectPath);
    } else if (onButtonClick) {
      onButtonClick();
    }
  };

  return (
    <div className="p-4 border border-gray-400 rounded-lg">
      <p className="text-lg font-semibold">{title}</p>
      <div className="mt-4">
        <p className="mb-4">{description}</p>
        <button
          className="px-4 py-2 text-sm font-bold text-white transition-[border-radius] duration-1000 rounded-lg bg-primaryColor hover:rounded-xl"
          onClick={handleClick}
        >
          {buttonLabel}
        </button>
      </div>
    </div>
  );
}

export default MessageBox;
