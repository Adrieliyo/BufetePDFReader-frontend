import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { AlertModal } from '../../components/AlertModal';

export function LoginPage() {
  const navigate = useNavigate();
  const { user, handleLogin } = useAuth();
  const [credentials, setCredentials] = useState({
    emailOrUsername: '',
    password: '',
    remember: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Estado para controlar el modal
  const [alertModal, setAlertModal] = useState({
    isOpen: false,
    title: '',
    message: '',
    type: 'success' as 'success' | 'error' | 'warning' | 'info'
  });

  const handleRegisterClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate('/auth/register');
  };

  const handleForgotPasswordClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate('/recover-password');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setCredentials({
      ...credentials,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleGoogleLogin = (e: React.MouseEvent) => {
    e.preventDefault();

    // Mostrar el modal informativo
    setAlertModal({
      isOpen: true,
      title: 'Función en desarrollo',
      message: 'Esta función está en desarrollo, favor de iniciar sesión de forma convencional.',
      type: 'info'
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    console.log('Iniciando login con:', credentials);

    try {
      // Llamar a handleLogin para autenticar con la lógica modificada
      const userData = await handleLogin(credentials.emailOrUsername, credentials.password);
      console.log('Login exitoso, respuesta:', userData);

      // Guardar token en localStorage (para redundancia con la cookie)
      localStorage.setItem('token', 'authenticated');
      localStorage.setItem('user', JSON.stringify(userData));

      // Verificar todas las cookies después del login
      console.log('Cookies después del login:', document.cookie);

      // Mostrar mensaje de éxito
      setAlertModal({
        isOpen: true,
        title: '¡Inicio de sesión exitoso!',
        message: 'Serás redirigido en breve...',
        type: 'success'
      });

      // Retraso corto para asegurar que localStorage se actualice
      setTimeout(() => {
        console.log('Redirigiendo a /upload');
        navigate('/upload');
      }, 1500);

    } catch (err) {
      console.error('Error durante login:', err);
      // Mostrar mensaje de error genérico en lugar del mensaje técnico
      setError('Error al iniciar sesión');

      // Para depuración, seguimos mostrando el error real en la consola
      console.error('Detalles del error:', err instanceof Error ? err.message : String(err));
    } finally {
      setIsLoading(false);
    }
  };

  const closeModal = () => {
    setAlertModal(prev => ({ ...prev, isOpen: false }));
  };


  return (
    <div>
      <AlertModal
        isOpen={alertModal.isOpen}
        onClose={closeModal}
        title={alertModal.title}
        message={alertModal.message}
        type={alertModal.type}
        autoClose={alertModal.type === 'success' ? 1500 : undefined}
      />

      <img src="../../src/assets/BufetePDFReaderFullLogo.png" alt="BufetePDFReaderLogo"
        className="h-16 w-auto mb-3"
      />
      <h2 className="text-4xl font-bold mb-6">Iniciar sesión</h2>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium text-gray-600" htmlFor="emailOrUsername">Correo electrónico o nombre de usuario</label>
          <input
            id="emailOrUsername"
            name="emailOrUsername"
            type="text"
            placeholder="correo@ejemplo.com o username"
            className="w-full p-2 mt-1 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:border-blue-500 focus:ring-blue-500"
            value={credentials.emailOrUsername}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <label className="flex justify-between text-sm font-medium text-gray-600" htmlFor="password">
            Contraseña
          </label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="••••••"
            className="w-full p-2 mt-1 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:border-blue-500 focus:ring-blue-500"
            value={credentials.password}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="flex items-center justify-between">

          <div className="flex items-center">
            <input id="remember" name="remember" type="checkbox" className="w-4 h-4 mr-2 accent-blue-900"
              checked={credentials.remember}
              onChange={handleInputChange}
            />
            <label className="text-sm" htmlFor="remember">Recuérdame</label>
          </div>

          <a href="#" onClick={handleForgotPasswordClick}
            className="text-sm text-blue-900 font-bold no-underline link-underline">¿Olvidaste tú contraseña?</a>

        </div>

        {/* {error && <div className="p-3 mb-4 text-sm text-white bg-red-500 rounded-md">{error}</div>} */}

        {error && (
          <div 
            className="p-3 mb-2 text-sm font-medium text-white bg-red-500 rounded-lg border animate-fade-in flex items-center"
            style={{
              backgroundColor: 'rgba(239, 68, 68, 1)',
              backdropFilter: 'blur(4px)'
            }}
          >
            <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <span>{error}</span>
          </div>
        )}

        <button
          type="submit"
          className="w-full p-2 mt-2 font-semibold text-white bg-blue-900 rounded-lg hover:bg-blue-800 transition-colors duration-300"
          disabled={isLoading}
        >
          {isLoading ? 'Iniciando sesión...' : 'Iniciar sesión'}
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
        onClick={handleGoogleLogin}
        className="w-full mt-7 p-2 font-semibold text-gray-700 bg-gray-50 border-2 border-gray-200 rounded-lg hover:bg-gray-100 flex items-center justify-center transition-colors duration-300">
        <img src="https://www.svgrepo.com/show/355037/google.svg" className="w-5 h-5 mr-2" alt="Google logo" />
        Iniciar sesión con Google
      </button>
    </div>

  )
}