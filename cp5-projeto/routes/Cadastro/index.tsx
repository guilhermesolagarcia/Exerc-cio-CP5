import { Link } from "react-router-dom";

export function Cadastro() {
  return (
    <div>
      <h1>Página de Cadastro</h1>
        <nav>
            <Link to="/login">Já tem uma conta? Faça o login</Link>
        </nav>
    </div>
  );
}