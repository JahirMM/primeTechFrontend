import React from "react";

interface NotSellerMessageProps {
  title: string;
  message: string;
  buttonText: string;
}

function NotSellerMessage({
  title,
  message,
  buttonText,
}: NotSellerMessageProps) {
  return (
    <div className="flex flex-col items-center justify-center p-4 text-center">
      <h2 className="mb-2 text-xl font-bold text-gray-800">{title}</h2>
      <p className="mb-4 text-gray-600">{message}</p>
      <button className="px-4 py-2 text-white rounded bg-primaryColor hover:bg-primaryColor/95">
        {buttonText}
      </button>
    </div>
  );
}

export default NotSellerMessage;
