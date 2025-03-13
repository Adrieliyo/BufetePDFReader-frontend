// interface Step4Props {
//     onComplete: () => void;
// }

// export function Step4VerificationPage({ onComplete }: Step4Props) {
//     return (
//         <div className="w-full h-full relative">
//             {/* Logo en esquina superior izquierda */}
//             <div className="absolute top-6 left-6">
//                 <img
//                     src="../../src/assets/BufetePDFReaderFullLogo.png"
//                     alt="BufetePDFReader logo"
//                     className="h-24 w-auto"
//                 />
//             </div>

//             {/* Contenedor centrado */}
//             <div className="h-full flex items-center justify-center">
//                 <div className="max-w-[30em] flex flex-col items-center justify-center text-center">
//                     <h1 className="text-5xl font-medium text-gray-900 mb-6">
//                         ¡Cambio de contraseña exitoso!
//                     </h1>

//                     <div>
//                         <p className="text-gray-600 text-lg mb-3 w-[16rem]">
//                             Da clic al siguiente botón para iniciar sesión
//                         </p>
//                     </div>

//                     <div className="flex gap-4 pt-2">
//                         <button
//                             onClick={onComplete}
//                             className="px-4 py-2 w-[16rem] text-white text-2xl font-medium bg-blue-900 rounded-lg hover:bg-blue-800 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
//                         >
//                             Regresar a iniciar sesión
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

import { useEffect } from 'react';

interface Step4Props {
    onComplete: () => void;
}

export function Step4VerificationPage({ onComplete }: Step4Props) {
    // Redirigir automáticamente después de un tiempo
    useEffect(() => {
        const timer = setTimeout(() => {
            onComplete();
        }, 5000); // Redirige después de 5 segundos = 5000

        return () => clearTimeout(timer);
    }, [onComplete]);

    return (
        <div className="w-full h-full relative">
            {/* Logo en esquina superior izquierda */}
            <div className="absolute top-6 left-6">
                <img
                    src="../../src/assets/BufetePDFReaderFullLogo.png"
                    alt="BufetePDFReader logo"
                    className="h-24 w-auto"
                />
            </div>

            {/* Contenedor centrado */}
            <div className="h-full flex items-center justify-center">
                <div className="max-w-[30em] flex flex-col items-center justify-center text-center">
                    {/* Icono de éxito */}
                    {/* <div className="mb-6 text-green-500">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div> */}

                    <h1 className="text-5xl font-medium text-gray-900 mb-2">
                        ¡Cambio de contraseña exitoso!
                    </h1>

                    <div>
                        <p className="text-gray-600 text-lg mb-6">
                            Tu contraseña ha sido actualizada correctamente. Ya puedes iniciar sesión con tu nueva contraseña.
                        </p>
                        <p className="text-sm text-gray-500 mb-6">
                            Serás redirigido automáticamente en unos segundos...
                        </p>
                    </div>

                    <div className="flex gap-4 pt-2">
                        <button
                            onClick={onComplete}
                            className="px-4 py-2 w-[16rem] text-white text-2xl font-medium bg-blue-900 rounded-lg hover:bg-blue-800 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                            Iniciar sesión
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}