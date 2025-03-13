import { useChangeEmail } from "@/profile/hook/useChangeEmail";
import { useState } from "react";
import { toast } from "sonner";

export default function ChangeEmailForm({ onClose }: { onClose: () => void }) {
  const mutationChangeEmail = useChangeEmail();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Llenar todos los campos", {
        duration: 5000,
        style: { backgroundColor: "#FF5353", color: "white" },
      });
    }

    mutationChangeEmail.mutate({ email, password });
    onClose();
  };

  return (
    <div className="p-6 w-full">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Nuevo correo
          </label>
          <input
            type="email"
            className="mt-1 w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 mb-10 focus:ring-primaryColor"
            placeholder="correo@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Contraseña
          </label>
          <input
            type="password"
            className="mt-1 w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primaryColor"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 border border-black rounded-lg transition-colors duration-300 hover:text-white hover:bg-primaryColor hover:border-primaryColor"
          aria-label="Actualizar"
        >
          Actualizar
          <span className="sr-only">Actualizar</span>
        </button>
      </form>
    </div>
  );
}
