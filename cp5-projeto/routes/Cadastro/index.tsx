import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import type { Usuario } from "../../types/usuario";
import axios from "axios";

type CadastroFormInputs = Pick<Usuario, 'nome' | 'nomeUsuario' | 'email'>;

export function Cadastro() {
  const { register, handleSubmit, formState: { errors } } = useForm<CadastroFormInputs>();
  const navigate = useNavigate();

  async function onSubmit(data: CadastroFormInputs) {
    try {
      
      const emailExists = await axios.get(`http://localhost:3001/usuarios?email=${data.email}`);
      if (emailExists.data.length > 0) {
        alert("Este e-mail já está cadastrado.");
        return;
      }

      
      const userExists = await axios.get(`http://localhost:3001/usuarios?nomeUsuario=${data.nomeUsuario}`);
      if (userExists.data.length > 0) {
        alert("Este nome de usuário já está em uso.");
        return;
      }
      
      
      const response = await axios.post("http://localhost:3001/usuarios", data);

      
      alert(`Usuário "${response.data.nome}" cadastrado com sucesso!`);
      navigate("/login");

    } catch (error) {
      console.error("Erro ao cadastrar usuário:", error);
      alert("Ocorreu um erro ao tentar cadastrar. Por favor, tente novamente.");
    }
  }

  
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Cadastro</h1>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label htmlFor="nome" className="block text-sm font-medium text-gray-700">
              Nome Completo
            </label>
            <input 
              type="text" 
              id="nome"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              {...register("nome", { required: "O nome é obrigatório" })}
            />
            {errors.nome && <p className="text-red-500 text-sm mt-1">{errors.nome?.message}</p>}
          </div>

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

          <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            Cadastrar
          </button>
        </form>

        <p className="mt-4 text-center text-sm">
          Já tem uma conta?{' '}
          <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
            Faça o login
          </Link>
        </p>
      </div>
    </div>
  );
}