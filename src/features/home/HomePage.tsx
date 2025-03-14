import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export function HomePage() {
    const navigate = useNavigate();
    const [userName, setUserName] = useState<string>('');
    const [recentFiles, setRecentFiles] = useState<string[]>([]);

    useEffect(() => {
        // Obtener información del usuario desde localStorage
        const userDataString = localStorage.getItem('user');
        if (userDataString) {
            try {
                const userData = JSON.parse(userDataString);
                setUserName(userData.username || userData.names || 'Usuario');
            } catch (e) {
                console.error('Error al parsear datos del usuario:', e);
            }
        }

        // Recuperar el último archivo procesado (si existe)
        const lastFile = localStorage.getItem('lastUploadedFile');
        if (lastFile) {
            setRecentFiles([lastFile]);
        }
    }, []);

    const handleUploadFile = () => {
        navigate('/upload');
    };

    return (
        <div className="p-6 max-w-6xl mx-auto">
            {/* Encabezado de bienvenida */}
            <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white p-8 rounded-xl mb-8 shadow-lg">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold mb-2">¡Bienvenido{userName ? `, ${userName}` : ''}!</h1>
                        <p className="text-xl opacity-90">
                            Procesador de documentos para convenios de prácticas profesionales
                        </p>
                    </div>
                    <button
                        onClick={handleUploadFile}
                        className="bg-white text-blue-900 px-6 py-3 rounded-lg font-semibold flex items-center hover:bg-blue-50 transition duration-300"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" className="w-6 h-6 mr-2 fill-current">
                            <path d="M440-320v-326L336-542l-56-58 200-200 200 200-56 58-104-104v326h-80ZM240-160q-33 0-56.5-23.5T160-240v-120h80v120h480v-120h80v120q0 33-23.5 56.5T720-160H240Z" />
                        </svg>
                        Subir PDF
                    </button>
                </div>
            </section>

            {/* Sección principal con tarjetas */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Tarjeta de información principal */}
                <div className="bg-white p-6 rounded-xl shadow-md">
                    <div className="flex items-center mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" className="w-8 h-8 text-blue-900 fill-current mr-3">
                            <path d="M320-240h320v-80H320v80Zm0-160h320v-80H320v80ZM240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h320l240 240v480q0 33-23.5 56.5T720-80H240Zm280-520v-200H240v640h480v-440H520ZM240-800v200-200 640-640Z" />
                        </svg>
                        <h2 className="text-2xl font-semibold text-gray-800">¿Qué es BufetePDFReader?</h2>
                    </div>
                    <p className="text-gray-600 mb-4">
                        Esta herramienta te permite extraer datos automáticamente de la "Solicitud de Convenio para prácticas profesionales"
                        y generar documentos Word según el tipo de convenio (remunerado o no remunerado).
                    </p>
                    <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
                        <h3 className="font-semibold text-blue-800 mb-1">Beneficios</h3>
                        <ul className="list-disc list-inside text-gray-700 space-y-1">
                            <li>Ahorra tiempo en la captura manual de datos</li>
                            <li>Reduce errores de transcripción</li>
                            <li>Genera documentos con formato profesional</li>
                            <li>Procesamiento rápido y seguro</li>
                        </ul>
                    </div>
                </div>

                {/* Tarjeta de guía rápida */}
                <div className="bg-white p-6 rounded-xl shadow-md">
                    <div className="flex items-center mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" className="w-8 h-8 text-blue-900 fill-current mr-3">
                            <path d="m424-296 282-282-56-56-226 226-114-114-56 56 170 170Zm56 216q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z" />
                        </svg>
                        <h2 className="text-2xl font-semibold text-gray-800">Cómo utilizar</h2>
                    </div>
                    <ol className="space-y-4 mb-4">
                        <li className="flex items-start">
                            <span className="bg-blue-900 text-white rounded-full w-6 h-6 flex items-center justify-center font-bold mr-3 mt-0.5 flex-shrink-0">1</span>
                            <p className="text-gray-600"><span className="font-semibold text-blue-900">Sube tu archivo:</span> Haz clic en el botón "Subir PDF" y selecciona el archivo de solicitud de convenio.</p>
                        </li>
                        <li className="flex items-start">
                            <span className="bg-blue-900 text-white rounded-full w-6 h-6 flex items-center justify-center font-bold mr-3 mt-0.5 flex-shrink-0">2</span>
                            <p className="text-gray-600"><span className="font-semibold text-blue-900">Verifica el documento:</span> Confirma que el PDF cargado sea el formato correcto de solicitud.</p>
                        </li>
                        <li className="flex items-start">
                            <span className="bg-blue-900 text-white rounded-full w-6 h-6 flex items-center justify-center font-bold mr-3 mt-0.5 flex-shrink-0">3</span>
                            <p className="text-gray-600"><span className="font-semibold text-blue-900">Procesa el documento:</span> El sistema extraerá automáticamente los datos y generará el documento Word correspondiente.</p>
                        </li>
                    </ol>
                </div>
            </div>

            {/* Sección de actividad reciente */}
            <section className="mt-8 bg-white p-6 rounded-xl shadow-md">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-semibold text-gray-800">Actividad reciente</h2>
                    <button
                        onClick={handleUploadFile}
                        className="text-blue-900 font-medium hover:text-blue-700 transition"
                    >
                        Ver todos
                    </button>
                </div>

                {recentFiles.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead>
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre del archivo</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {recentFiles.map((file, index) => (
                                    <tr key={index}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 flex items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" className="w-5 h-5 mr-2 text-red-500 fill-current">
                                                <path d="M320-240h320v-80H320v80Zm0-160h320v-80H320v80ZM240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h320l240 240v480q0 33-23.5 56.5T720-80H240Zm280-520v-200H240v640h480v-440H520ZM240-800v200-200 640-640Z" />
                                            </svg>
                                            {file}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {new Date().toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            <button
                                                onClick={() => navigate('/viewer')}
                                                className="text-blue-900 hover:text-blue-700 font-medium mr-4"
                                            >
                                                Ver
                                            </button>
                                            <button
                                                onClick={() => navigate('/upload')}
                                                className="text-blue-900 hover:text-blue-700 font-medium"
                                            >
                                                Procesar de nuevo
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="bg-gray-50 p-8 rounded-lg text-center">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" className="w-12 h-12 text-gray-400 mx-auto mb-3 fill-current">
                            <path d="M320-240h320v-80H320v80Zm0-160h320v-80H320v80ZM240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h320l240 240v480q0 33-23.5 56.5T720-80H240Zm280-520v-200H240v640h480v-440H520ZM240-800v200-200 640-640Z" />
                        </svg>
                        <p className="text-gray-500 mb-4">No hay actividad reciente</p>
                        <button
                            onClick={handleUploadFile}
                            className="px-4 py-2 bg-blue-900 text-white rounded-md hover:bg-blue-800"
                        >
                            Subir primer archivo
                        </button>
                    </div>
                )}
            </section>

            {/* Pequeña sección de ayuda */}
            <section className="mt-8 bg-blue-50 border border-blue-200 p-6 rounded-xl flex items-center">
                <div className="mr-6 bg-blue-100 p-3 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" className="w-8 h-8 text-blue-900 fill-current">
                        <path d="m480-80-10-120h-10q-142 0-241-99t-99-241q0-142 99-241t241-99q71 0 132.5 26.5t108 73q46.5 46.5 73 108T800-540q0 75-24.5 144t-67 128q-42.5 59-101 107T480-80Zm80-146q71-60 115.5-140.5T720-540q0-109-75.5-184.5T460-800q-109 0-184.5 75.5T200-540q0 109 75.5 184.5T460-280h100v54Zm-101-95q17 0 29-12t12-29q0-17-12-29t-29-12q-17 0-29 12t-12 29q0 17 12 29t29 12Zm-29-127h60q0-30 6-42t38-44q18-18 30-39t12-45q0-51-34.5-76.5T460-720q-44 0-74 24.5T344-636l56 22q5-17 19-33.5t41-16.5q27 0 40.5 15t13.5 33q0 17-10 30.5T480-558q-35 30-42.5 47.5T430-448Zm30-65Z" /> 
                    </svg>
                </div>
                <div>
                    <h3 className="text-lg font-semibold text-blue-900">¿Necesitas ayuda?</h3>
                    <p className="text-blue-800">
                        Si tienes problemas al procesar documentos o tienes alguna pregunta,
                        contacta al administrador del sistema o consulta la documentación en línea.
                    </p>
                </div>
            </section>
        </div>
    );
}