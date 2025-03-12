import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { verifyUser } from '../../services/verifyService';

export function VerifyUserPage() {
    const [verificationError, setVerificationError] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        // Aquí puedes implementar la lógica para verificar el token desde la URL
        // Por ejemplo:
        const queryParams = new URLSearchParams(location.search);
        const token = queryParams.get('token');
        
        if (token) {
            verifyUserEmail(token);
        } else {
            setVerificationError(true);
        }
    }, [location]);

    const verifyUserEmail = async (token: string) => {
        try {
            // Aquí iría la llamada a tu API para verificar el email
            // const response = await fetch(`http://localhost:8000/auth/verify?token=${token}`);
            // if (!response.ok) throw new Error('Error al verificar email');
            
            // Por ahora, simulamos la verificación exitosa

            await verifyUser(token);
            setVerificationError(false);
        } catch (error) {
            console.error('Error verificando email:', error);
            setVerificationError(true);
        }
    };

    const goBackToLog = () => {
        navigate('/auth/login');
    };

    return (
        <div className="bg-gray-50 min-h-screen flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-lg max-w-5xl w-full h-[25em] relative">
                {/* Columna de la imagen */}
                <div className="absolute top-6 left-6">
                    {/* Imagen arriba del título */}
                    <img 
                        src="../../src/assets/BufetePDFReaderFullLogo.png" 
                        alt="BufetePDF logo" 
                        className="h-24 w-auto mb-[1em]" 
                    />
                </div>

                {/* Content section */}
                <div className="h-full flex items-center justify-center">
                    <div className="max-w-[30em] flex flex-col items-center justify-center text-center">
                        {!verificationError ? (
                            <>
                                <p className="text-gray-900 mb-6 text-5xl font-medium">
                                    ¡Verificación de correo exitosa!
                                </p>
                                <div>
                                    <p className="text-gray-600 text-lg mb-3 w-[16rem]">
                                        Da clic al siguiente botón para iniciar sesión
                                    </p>
                                </div>
                            </>
                        ) : (
                            <>
                                <p className="text-red-600 mb-6 text-5xl font-medium">
                                    Error en la verificación
                                </p>
                                <div>
                                    <p className="text-gray-600 text-lg mb-3 w-[16rem]">
                                        No se pudo verificar tu cuenta. Por favor, intenta de nuevo
                                    </p>
                                </div>
                            </>
                        )}

                        <div className="flex gap-4 pt-2">
                            <button 
                                type="button" 
                                onClick={goBackToLog}
                                className={`px-4 py-[0.5rem] w-[16rem] text-white text-2xl font-medium 
                                    ${verificationError 
                                        ? 'bg-red-600 hover:bg-red-700 focus:ring-red-500' 
                                        : 'bg-blue-900 hover:bg-blue-800 focus:ring-blue-500'
                                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2`}
                            >
                                Regresar a iniciar sesión
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}