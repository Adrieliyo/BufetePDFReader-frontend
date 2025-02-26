import { useNavigate } from 'react-router-dom';

export function RegisterPage() {
  const navigate = useNavigate();

  const handleRegisterClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate('/auth/register');
  };

  return (
    <div>
      <img src="../../src/assets/BufetePDFReaderFullLogo.png" alt="BufetePDFReaderLogo"
        className="h-16 w-auto mb-3"
      />
      <h2 className="text-4xl font-bold mb-6">Registrarme</h2>

      <form className="space-y-4">
      <div>
          <label className="block text-sm font-medium text-gray-600" htmlFor="email">Correo electrónico</label>
          <input
            id="names"
            type="email"
            placeholder="correo@ejemplo.com"
            className="w-full p-2 mt-1 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600" htmlFor="names">Usuario</label>
          <input
            id="username"
            type="text"
            placeholder="Nombre de Usuario"
            className="w-full p-2 mt-1 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600" htmlFor="names">Nombres</label>
          <input
            id="names"
            type="text"
            placeholder="Nombres"
            className="w-full p-2 mt-1 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600" htmlFor="lastnames">Apellidos</label>
          <input
            id="lastnames"
            type="text"
            placeholder="Apellidos"
            className="w-full p-2 mt-1 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="flex justify-between text-sm font-medium text-gray-600" htmlFor="password">
            Contraseña
          </label>
          <input
            id="password"
            type="password"
            placeholder="••••••"
            className="w-full p-2 mt-1 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="flex justify-between text-sm font-medium text-gray-600" htmlFor="confirm-password">
            Confirmar contraseña
          </label>
          <input
            id="confirm-password"
            type="password"
            placeholder="••••••"
            className="w-full p-2 mt-1 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <button className="w-full p-2 mt-2 mb-4 font-semibold text-white bg-blue-900 rounded-lg hover:bg-blue-800">Registrarse</button>
      </form>

      <div className="relative flex items-center justify-center my-4">
        <span className="absolute px-4 bg-white text-sm">o</span>
        <hr className="w-full border" />
      </div>

      <button
        className="w-full mt-7 p-2 font-semibold text-gray-700 bg-gray-50 border-2 border-gray-200 rounded-lg hover:bg-gray-100 flex items-center justify-center">
        <img src="https://www.svgrepo.com/show/355037/google.svg" className="w-5 h-5 mr-2" alt="Google logo" />
        Registrarme con Google
      </button>

      <p className="text-sm mt-7 text-center">
        ¿Ya tienes una cuenta?
        <a href="#" onClick={handleRegisterClick}
          className="ml-1 text-blue-900 font-bold no-underline link-underline">
          Iniciar sesión
        </a>
      </p>
    </div>

  )
}