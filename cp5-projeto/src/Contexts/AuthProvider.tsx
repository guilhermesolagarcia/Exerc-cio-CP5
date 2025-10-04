// src/contexts/AuthProvider.tsx

import { createContext, useState, useEffect, useContext } from "react";
import type { ReactNode } from "react";
import type { Usuario } from "../../types/usuario";

// Adicione a função 'login' à interface
interface AuthContextData {
  usuario: Usuario | null;
  login: (usuario: Usuario) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(null);

  useEffect(() => {
    const usuarioLogado = localStorage.getItem("usuarioLogado");
    if (usuarioLogado) {
      setUsuario(JSON.parse(usuarioLogado));
    }
  }, []);

  // Crie a função 'login'
  function login(usuario: Usuario) {
    setUsuario(usuario);
    localStorage.setItem("usuarioLogado", JSON.stringify(usuario));
  }

  function logout() {
    setUsuario(null);
    localStorage.removeItem("usuarioLogado");
  }

  return (
    // Disponibilize a função 'login' no contexto
    <AuthContext.Provider value={{ usuario, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  return context;
}