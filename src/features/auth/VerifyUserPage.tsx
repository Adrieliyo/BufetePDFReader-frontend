import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { verifyUser } from '../../services/verifyService';

export function VerifyUserPage() {
    const [verificationError, setVerificationError] = useState(false);
    const [verificationMessage, setVerificationMessage] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const verificationAttempted = useRef(false);

    useEffect(() => {
        // Solo ejecutar la verificación una vez
        if (verificationAttempted.current) return;
        
        const queryParams = new URLSearchParams(location.search);
        const token = queryParams.get('token');

        if (token) {
            verificationAttempted.current = true;
            verifyUserEmail(token);
        } else {
            setVerificationError(true);
            setVerificationMessage("No se proporcionó token de verificación");
        }
    }, [location]);

    const verifyUserEmail = async (token: string) => {
        try {
            const response = await verifyUser(token);
            setVerificationError(false);
            setVerificationMessage(response.message || "Verificación exitosa");
        } catch (error) {
            console.error('Error verificando email:', error);
            setVerificationError(true);
            // Capturar el mensaje de error de la API
            if (error instanceof Error) {
                setVerificationMessage(error.message || "Error al verificar el email");
            } else {
                setVerificationMessage("Error desconocido al verificar el email");
            }
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
                                        {verificationMessage || "El usuario ya ha sido verificado o el enlace ha expirado."}
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