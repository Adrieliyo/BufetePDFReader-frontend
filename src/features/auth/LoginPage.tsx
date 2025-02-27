import { useNavigate } from 'react-router-dom';

export function LoginPage() {
  const navigate = useNavigate();

  const handleRegisterClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate('/auth/register');
  };

  const handleForgotPasswordClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate('/recover-password');
  };


  return (
    <div>
      <img src="../../src/assets/BufetePDFReaderFullLogo.png" alt="BufetePDFReaderLogo"
        className="h-16 w-auto mb-3"
      />
      <h2 className="text-4xl font-bold mb-6">Iniciar sesión</h2>

      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-600" htmlFor="emailOrUsername">Correo electrónico o nombre de usuario</label>
          <input
            id="emailOrUsername"
            type="text"
            placeholder="correo@ejemplo.com o username"
            className="w-full p-2 mt-1 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="flex justify-between text-sm font-medium text-gray-600" htmlFor="password">
            Contraseña
            {/* <a href="#" className="text-blue-500 hover:underline">Forgot your password?</a> */}
          </label>
          <input
            id="password"
            type="password"
            placeholder="••••••"
            className="w-full p-2 mt-1 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center justify-between">

          <div className="flex items-center">
            <input id="remember" type="checkbox" className="w-4 h-4 mr-2" />
            <label className="text-sm" htmlFor="remember">Recuérdame</label>
          </div>

          <a href="#" onClick={handleForgotPasswordClick}
            className="text-sm text-blue-900 font-bold no-underline link-underline">¿Olvidaste tú contraseña?</a>

        </div>

        <button 
          className="w-full p-2 mt-2 font-semibold text-white bg-blue-900 rounded-lg hover:bg-blue-800 transition-colors duration-300"
        >
          Iniciar sesión
        </button>
      </form>


      <p className="text-sm mt-7 mb-7 text-center">
        ¿No tienes una cuenta?
        <a href="#" onClick={handleRegisterClick}
          className="ml-1 text-blue-900 font-bold no-underline link-underline">
          Registrarme
        </a>
      </p>



      <div className="relative flex items-center justify-center my-4">
        <span className="absolute px-4 bg-white text-sm">o</span>
        <hr className="w-full border" />
      </div>

      <button
        className="w-full mt-7 p-2 font-semibold text-gray-700 bg-gray-50 border-2 border-gray-200 rounded-lg hover:bg-gray-100 flex items-center justify-center transition-colors duration-300">
        <img src="https://www.svgrepo.com/show/355037/google.svg" className="w-5 h-5 mr-2" alt="Google logo" />
        Iniciar sesión con Google
      </button>
    </div>

  )
}