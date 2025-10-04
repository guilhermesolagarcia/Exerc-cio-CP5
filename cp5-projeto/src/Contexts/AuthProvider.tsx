import { createContext, useState, useEffect, useContext} from "react";
import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import type { Usuario } from "../../types/usuario";


interface AuthContextData {
  usuario: Usuario | null;
  logout: () => void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const usuarioLogado = localStorage.getItem("usuarioLogado");
    if (usuarioLogado) {
      setUsuario(JSON.parse(usuarioLogado));
    }
  }, []);

  function logout() {
    setUsuario(null);
    localStorage.removeItem("usuarioLogado");
    navigate("/login");
  }

  return (
    <AuthContext.Provider value={{ usuario, logout }}>
      {children}
    </AuthContext.Provider>
  );
}


export function useAuth() {
  const context = useContext(AuthContext);
  return context;
}