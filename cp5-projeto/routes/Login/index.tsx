import { Link } from "react-router-dom";

export function Login() {
  return (
    <div>
      <h1>Página de Login</h1>
      <nav>
        <Link to="/cadastro">Não tem uma conta? Cadastre-se</Link>
      </nav>
    </div>
  );
}