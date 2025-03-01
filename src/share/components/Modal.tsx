import XmarkIcon from "@/icons/XmarkIcon";

interface ModalProps {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
}

function Modal({ title, children, onClose }: ModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="p-6 bg-white rounded-lg shadow-lg w-[95%] sm:w-[50%] sm:ml-48">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <XmarkIcon className="size-5"/>
          </button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
}

export default Modal;
