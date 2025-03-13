import Link from "next/link";

interface EmptyStateMessageProps {
  title: string;
  message: string;
  buttonText: string;
  buttonLink: string;
}

function EmptyStateMessage({
  title,
  message,
  buttonText,
  buttonLink,
}: EmptyStateMessageProps) {
  return (
    <div className="flex flex-col items-center justify-center p-4 text-center">
      <p className="mb-2 text-lg font-semibold text-gray-700">{title}</p>
      <p className="mb-4 text-gray-500">{message}</p>
      <button
        type="button"
        className="px-4 py-2 text-white rounded bg-primaryColor hover:bg-primaryColor/95"
        aria-label={buttonText}
      >
        <Link href={buttonLink} aria-label={buttonText}>
          {buttonText}
        </Link>
      </button>
    </div>
  );
}

export default EmptyStateMessage;
