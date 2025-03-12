import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { AlertModal } from '../../components/AlertModal';
import { useRegister } from '../../hooks/useRegister';

export function RegisterPage() {
  const navigate = useNavigate();
  const { user, handleRegister } = useRegister();

  // Estado para el formulario de registro
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    names: '',
    lastnames: '',
    password: '',
    confirmPassword: ''
  });

  // Estado para validación de contraseñas
  const [passwordValidation, setPasswordValidation] = useState({
    match: true,
    message: '',
    isValid: false
  });

  // Estados para control de UI
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Estado para controlar el modal
  const [alertModal, setAlertModal] = useState({
    isOpen: false,
    title: '',
    message: '',
    type: 'success' as 'success' | 'error' | 'warning' | 'info'
  });

  // Función para manejar cambios en los inputs
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    // Actualizar el estado del formulario
    const updatedFormData = {
      ...formData,
      [id]: value
    };

    setFormData(updatedFormData);

    // Validar contraseñas en tiempo real si se modificó alguna de ellas
    if (id === 'password' || id === 'confirmPassword') {
      validatePasswords(updatedFormData.password, updatedFormData.confirmPassword);
    }
  };

  // Función para validar contraseñas
  const validatePasswords = (password: string, confirmPassword: string) => {
    // Si ambos campos están vacíos, no mostrar error aún
    if (!password && !confirmPassword) {
      setPasswordValidation({
        match: true,
        message: '',
        isValid: false
      });
      return;
    }

    // Si solo hay una contraseña, indicar que debe confirmar
    if (password && !confirmPassword) {
      setPasswordValidation({
        match: false,
        message: 'Por favor confirma tu contraseña',
        isValid: false
      });
      return;
    }

    // Si las contraseñas no coinciden
    if (password !== confirmPassword) {
      setPasswordValidation({
        match: false,
        message: 'Las contraseñas no coinciden',
        isValid: false
      });
      return;
    }

    // Lista de verificaciones para la contraseña
    const passwordChecks = {
      length: password.length >= 8,
      specialChar: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(password),
      digit: /\d/.test(password),
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password)
    };


    // Si la contraseña es muy corta
    if (!passwordChecks.length) {
      setPasswordValidation({
        match: true,
        message: 'La contraseña debe tener al menos 8 caracteres',
        isValid: false
      });
      return;
    }

    // Si la contraseña no tiene caracteres especiales
    if (!passwordChecks.specialChar) {
      setPasswordValidation({
        match: true,
        message: 'La contraseña debe incluir al menos un carácter especial (!@#$%, etc.)',
        isValid: false
      });
      return;
    }

    // Si la contraseña no tiene números
    if (!passwordChecks.digit) {
      setPasswordValidation({
        match: true,
        message: 'La contraseña debe incluir al menos un número',
        isValid: false
      });
      return;
    }

    // Si la contraseña no tiene letras mayúsculas
    if (!passwordChecks.uppercase) {
      setPasswordValidation({
        match: true,
        message: 'La contraseña debe incluir al menos una letra mayúscula',
        isValid: false
      });
      return;
    }

    // Si la contraseña no tiene letras minúsculas
    if (!passwordChecks.lowercase) {
      setPasswordValidation({
        match: true,
        message: 'La contraseña debe incluir al menos una letra minúscula',
        isValid: false
      });
      return;
    }

    // Contraseñas válidas
    setPasswordValidation({
      match: true,
      message: 'La contraseña cumple con todos los requisitos',
      isValid: true
    });
  };

  // Función para manejar el envío del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validar que las contraseñas coincidan usando el estado de validación
    if (!passwordValidation.isValid) {
      setError(passwordValidation.message || 'Las contraseñas deben coincidir y ser válidas');
      return;
    }

    if (!formData.email || !formData.username || !formData.names ||
      !formData.lastnames || !formData.password) {
      setError('Todos los campos son obligatorios');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Llamar a la función de registro del hook
      const userData = await handleRegister(
        formData.username,
        formData.names,
        formData.lastnames,
        formData.email,
        formData.password
      );

      console.log('Registro exitoso:', userData);

      // Mostrar modal de éxito
      setAlertModal({
        isOpen: true,
        title: '¡Registro exitoso!',
        message: 'Tu cuenta ha sido creada. Por favor revisa tu correo para activarla.',
        type: 'success'
      });

      // Redirigir al login después de un tiempo
      setTimeout(() => {
        navigate('/auth/login');
      }, 3000);

    } catch (err) {
      console.error('Error durante el registro:', err);
      // Mostrar mensaje de error genérico en lugar del mensaje técnico
      setError('Error al registrarse. Intente de nuevo más tarde.');

      // Para depuración, seguimos mostrando el error real en la consola
      console.error('Detalles del error:', err instanceof Error ? err.message : String(err));
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoginClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate('/auth/login');
  };

  // Manejador para el botón de Google
  const handleGoogleRegister = (e: React.MouseEvent) => {
    e.preventDefault();

    // Mostrar el modal informativo
    setAlertModal({
      isOpen: true,
      title: 'Función en desarrollo',
      message: 'Esta función está en desarrollo, favor de registrarse de forma convencional.',
      type: 'info'
    });
  };

  // Función para cerrar el modal
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
      <h2 className="text-4xl font-bold mb-6">Registrarme</h2>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium text-gray-600" htmlFor="email">Correo electrónico</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="correo@ejemplo.com"
            className="w-full p-2 mt-1 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:border-blue-500 focus:ring-blue-500"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600" htmlFor="username">Usuario</label>
          <input
            id="username"
            name="username"
            type="text"
            placeholder="Nombre de Usuario"
            className="w-full p-2 mt-1 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:border-blue-500 focus:ring-blue-500"
            value={formData.username}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600" htmlFor="names">Nombres</label>
          <input
            id="names"
            name="names"
            type="text"
            placeholder="Nombres"
            className="w-full p-2 mt-1 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:border-blue-500 focus:ring-blue-500"
            value={formData.names}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600" htmlFor="lastnames">Apellidos</label>
          <input
            id="lastnames"
            name="lastnames"
            type="text"
            placeholder="Apellidos"
            className="w-full p-2 mt-1 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:border-blue-500 focus:ring-blue-500"
            value={formData.lastnames}
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
            // className="w-full p-2 mt-1 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:border-blue-500 focus:ring-blue-500"
            className={`w-full p-2 mt-1 border-2 ${formData.password ?
              (passwordValidation.isValid ? 'border-green-600' : 'border-red-600') :
              'border-gray-300'
              } rounded-lg focus:outline-none focus:ring-1 focus:border-blue-500 focus:ring-blue-500`}
            value={formData.password}
            onChange={handleInputChange}
            required
          />

          {/* Mostrar requisitos de contraseña cuando el usuario empieza a escribir */}
          {formData.password && !passwordValidation.isValid && (
            <div className="mt-2 text-sm text-gray-600 bg-gray-50 p-3 rounded-md border border-gray-200">
              <p className="font-medium mb-1">La contraseña debe cumplir con:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li className={formData.password.length >= 8 ? "text-green-600" : "text-red-600"}>
                  Mínimo 8 caracteres
                </li>
                <li className={/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(formData.password) ? "text-green-600" : "text-red-600"}>
                  Al menos un carácter especial (!@#$%, etc.)
                </li>
                <li className={/\d/.test(formData.password) ? "text-green-600" : "text-red-600"}>
                  Al menos un número
                </li>
                <li className={/[A-Z]/.test(formData.password) ? "text-green-600" : "text-red-600"}>
                  Al menos una letra mayúscula
                </li>
                <li className={/[a-z]/.test(formData.password) ? "text-green-600" : "text-red-600"}>
                  Al menos una letra minúscula
                </li>
              </ul>
            </div>
          )}
        </div>

        <div>
          <label className="flex justify-between text-sm font-medium text-gray-600" htmlFor="confirmPassword">
            Confirmar contraseña
          </label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder="••••••"
            // className="w-full p-2 mt-1 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:border-blue-500 focus:ring-blue-500"
            className={`w-full p-2 mt-1 border-2 ${formData.confirmPassword ?
              (formData.password === formData.confirmPassword ? 'border-green-600' : 'border-red-600') :
              'border-gray-300'
              } rounded-lg focus:outline-none focus:ring-1 focus:border-blue-500 focus:ring-blue-500`}
            value={formData.confirmPassword}
            onChange={handleInputChange}
            required
          />

          {formData.password && formData.confirmPassword && (
            <p className={`mt-1 text-sm ${formData.password === formData.confirmPassword ? 'text-green-600' : 'text-red-600'
              }`}>
              {formData.password === formData.confirmPassword
                ? 'Las contraseñas coinciden'
                : 'Las contraseñas no coinciden'}
            </p>
          )}

          {/* Mensaje de validación de contraseña
          {formData.password && formData.confirmPassword && (
            <p className={`mt-1 text-sm ${passwordValidation.isValid ? 'text-green-600' : 'text-red-600'
              }`}>
              {passwordValidation.message}
            </p>
          )} */}
          
        </div>

        {error && (
          <div
            className="p-3 mb-4 text-sm font-medium text-white rounded-lg shadow-md border border-red-400 animate-fade-in flex items-center backdrop-blur-sm"
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
          className="w-full p-2 mt-2 mb-4 font-semibold text-white bg-blue-900 rounded-lg hover:bg-blue-800 transition-colors duration-300"
          disabled={isLoading}
        >
          {isLoading ? 'Registrando...' : 'Registrarse'}
        </button>
      </form>

      <div className="relative flex items-center justify-center my-4">
        <span className="absolute px-4 bg-white text-sm">o</span>
        <hr className="w-full border" />
      </div>

      <button
        onClick={handleGoogleRegister}
        className="w-full mt-7 p-2 font-semibold text-gray-700 bg-gray-50 border-2 border-gray-200 rounded-lg hover:bg-gray-100 flex items-center justify-center transition-colors duration-300">
        <img src="https://www.svgrepo.com/show/355037/google.svg" className="w-5 h-5 mr-2" alt="Google logo" />
        Registrarme con Google
      </button>

      <p className="text-sm mt-7 text-center">
        ¿Ya tienes una cuenta?
        <a href="#" onClick={handleLoginClick}
          className="ml-1 text-blue-900 font-bold no-underline link-underline">
          Iniciar sesión
        </a>
      </p>
    </div>

  )
}