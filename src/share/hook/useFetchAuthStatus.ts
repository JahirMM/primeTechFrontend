import { useEffect, useState } from "react";
import { useAuthStore } from "@/share/hook/store/useAuth";
import { authServer } from "@/share/hook/authServer"; // Importa la función renombrada

const useFetchAuthStatus = () => {
  const { setAuth } = useAuthStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAuth = async () => {
      try {
        const authStatus = await authServer(); // Llama a la función renombrada
        setAuth(authStatus);
      } catch (error) {
        console.error("Error obteniendo el estado de autenticación:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAuth();
  }, [setAuth]);

  return loading;
};

export default useFetchAuthStatus;
