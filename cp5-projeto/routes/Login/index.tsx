// src/routes/Login/index.tsx

import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import type { Usuario } from "../../types/usuario";
import axios from "axios";
import { useAuth } from "../../src/Contexts/AuthProvider"; // Importe o useAuth

type LoginFormInputs = Pick<Usuario, 'nomeUsuario' | 'email'>;

export function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>();
  const navigate = useNavigate();
  const { login } = useAuth(); // Pegue a função 'login' do contexto

  async function onSubmit(data: LoginFormInputs) {
    try {
      const response = await axios.get(
        `http://localhost:3001/usuarios?nomeUsuario=${data.nomeUsuario}&email=${data.email}`
      );

      if (response.data.length > 0) {
        const usuario = response.data[0];
        
        // Use a função 'login' do contexto
        login(usuario);
        
        alert(`Bem-vindo(a) de volta, ${usuario.nome}!`);
        navigate("/home");
      } else {
        alert("Nome de usuário ou e-mail inválidos.");
      }
    } catch (error) {
      console.error("Ocorreu um erro ao fazer login:", error);
      alert("Erro no servidor. Tente novamente mais tarde.");
    }
  }

  // O restante do seu código JSX continua igual...
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          
          <div>
            <label htmlFor="nomeUsuario" className="block text-sm font-medium text-gray-700">
              Nome de Usuário
            </label>
            <input 
              type="text" 
              id="nomeUsuario"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              {...register("nomeUsuario", { required: "O nome de usuário é obrigatório" })}
            />
            {errors.nomeUsuario && <p className="text-red-500 text-sm mt-1">{errors.nomeUsuario?.message}</p>}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input 
              type="email" 
              id="email"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              {...register("email", { required: "O e-mail é obrigatório" })}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email?.message}</p>}
          </div>

          <button 
            type="submit" 
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Entrar
          </button>
        </form>

        <p className="mt-4 text-center text-sm">
          Não tem uma conta?{' '}
          <Link to="/cadastro" className="font-medium text-blue-600 hover:text-blue-500">
            Cadastre-se
          </Link>
        </p>
      </div>
    </div>
  );
}