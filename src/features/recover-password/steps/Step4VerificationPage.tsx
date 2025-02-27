interface Step4Props {
    onComplete: () => void;
}

export function Step4VerificationPage({ onComplete }: Step4Props) {
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
                    <h1 className="text-5xl font-medium text-gray-900 mb-6">
                        ¡Cambio de contraseña exitoso!
                    </h1>

                    <div>
                        <p className="text-gray-600 text-lg mb-3 w-[16rem]">
                            Da clic al siguiente botón para iniciar sesión
                        </p>
                    </div>

                    <div className="flex gap-4 pt-2">
                        <button
                            onClick={onComplete}
                            className="px-4 py-2 w-[16rem] text-white text-2xl font-medium bg-blue-900 rounded-lg hover:bg-blue-800 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                            Regresar a iniciar sesión
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}