import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../Contexts/AuthProvider";

export function Cabecalho() { 
  const { usuario, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <header className="bg-white shadow-md p-4 flex justify-between items-center">
      <Link to={usuario ? "/home" : "/login"}>
        <h1 className="text-xl font-bold">Sistema de Acesso</h1>
      </Link>
      <nav>
        {usuario ? (
          <div className="flex items-center gap-4">
            <span>Olá, <strong>{usuario.nome}</strong>! ({usuario.email})</span>
            <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
              Sair
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <Link to="/login" className="text-blue-600 hover:underline">Login</Link>
            <Link to="/cadastro" className="text-blue-600 hover:underline">Cadastro</Link>
          </div>
        )}
      </nav>
    </header>
  );
}