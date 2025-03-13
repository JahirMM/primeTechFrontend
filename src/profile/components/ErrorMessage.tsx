interface ErrorMessageProps {
  title: string;
  message: string;
  buttonText: string;
  onClick: () => void;
}

function ErrorMessage({
  title,
  message,
  buttonText,
  onClick,
}: ErrorMessageProps) {
  return (
    <div className="flex flex-col items-center justify-center p-4 text-center">
      <p className="mb-2 text-lg font-semibold text-red-500">{title}</p>
      <p className="mb-4 text-gray-500">{message}</p>
      <button
        type="button"
        className="px-4 py-2 text-white rounded bg-primaryColor hover:bg-primaryColor/95"
        onClick={onClick}
        aria-label={buttonText}
      >
        {buttonText}
      </button>
    </div>
  );
}

export default ErrorMessage;
