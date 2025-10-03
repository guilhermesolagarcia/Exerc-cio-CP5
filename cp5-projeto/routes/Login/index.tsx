import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

export function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  function onSubmit(data: any) {
    console.log("Dados do formulário:", data);
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">

      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>

        <form className="space-y-6">
          <div>
            <label 
              htmlFor="nomeUsuario" 
              className="block text-sm font-medium text-gray-700"
            >
              Nome de Usuário
            </label>
            <input 
              type="text" 
              id="nomeUsuario"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"
            />
          </div>

          <div>
            <label 
              htmlFor="email" 
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input 
              type="email" 
              id="email"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"
            />
          </div>

          <button 
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 "
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