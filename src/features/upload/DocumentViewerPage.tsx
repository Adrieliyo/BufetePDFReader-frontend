import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Breadcrumb } from '../../components/Breadcrumb';

export function DocumentViewerPage() {
    const [fileName, setFileName] = useState<string>('');
    const navigate = useNavigate();
    
    // Cargar el nombre del archivo desde localStorage
    useEffect(() => {
        const lastFileName = localStorage.getItem('lastUploadedFile');
        if (lastFileName) {
            setFileName(lastFileName);
        } else {
            // Si no hay archivo seleccionado, redirigir a la página de subida
            navigate('/upload');
        }
    }, [navigate]);
    
    // Define los SVGs que usarás como iconos
    const uploadIcon = (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" className="w-5 h-5 fill-current">
            <path d="M440-320v-326L336-542l-56-58 200-200 200 200-56 58-104-104v326h-80ZM240-160q-33 0-56.5-23.5T160-240v-120h80v120h480v-120h80v120q0 33-23.5 56.5T720-160H240Z" />
        </svg>
    );

    const pdfIcon = (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" className="w-5 h-5 fill-current">
            <path d="M320-240h320v-80H320v80Zm0-160h320v-80H320v80ZM240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h320l240 240v480q0 33-23.5 56.5T720-80H240Zm280-520v-200H240v640h480v-440H520ZM240-800v200-200 640-640Z" />
        </svg>
    );
    
    const viewerIcon = (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" className="w-5 h-5 fill-current">
            <path d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Zm0-300Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z"/>
        </svg>
    );

    const breadcrumbItems = [
        {
            icon: uploadIcon,
            label: "Subida de archivos",
            onClick: () => navigate('/upload')
        },
        {
            icon: pdfIcon,
            label: "Ingresar PDF",
            onClick: () => navigate('/upload')
        },
        {
            icon: viewerIcon,
            label: "Vista del documento",
            onClick: undefined // No es clickeable porque ya estamos en esta página
        }
    ];

    // Opción para subir un nuevo documento
    const handleUploadNew = () => {
        navigate('/upload');
    };

    return (
        <div className="p-6">
            {/* Breadcrumb */}
            <Breadcrumb
                items={breadcrumbItems}
                className="mb-6"
            />

            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-3xl font-medium text-gray-800">
                        Visor de Documentos
                    </h1>
                    <button 
                        onClick={handleUploadNew}
                        className="px-4 py-2 bg-blue-900 text-white rounded-md hover:bg-blue-800 flex items-center"
                    >
                        <svg className="w-5 h-5 mr-1 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
                            <path d="M440-320v-326L336-542l-56-58 200-200 200 200-56 58-104-104v326h-80ZM240-160q-33 0-56.5-23.5T160-240v-120h80v120h480v-120h80v120q0 33-23.5 56.5T720-160H240Z" />
                        </svg>
                        Subir otro archivo
                    </button>
                </div>
                
                <div className="bg-white p-6 rounded-lg border border-gray-300">
                    <h2 className="text-xl font-semibold mb-4">
                        {fileName || "Documento PDF"}
                    </h2>
                    
                    <div className="border-2 border-gray-200 rounded-lg min-h-[600px] flex flex-col">
                        {/* Barra de herramientas del visor */}
                        <div className="bg-gray-50 p-3 border-b border-gray-200 flex items-center">
                            <button className="p-2 text-gray-600 hover:bg-gray-200 rounded-md mr-2">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" className="w-5 h-5 fill-current">
                                    <path d="M200-120v-640h167l73 80h320v160h-80v-80H480l-73-80H280v480h400v-240h80v320H200Zm240-160q-33 0-56.5-23.5T360-360q0-33 23.5-56.5T440-440q33 0 56.5 23.5T520-360q0 33-23.5 56.5T440-280Zm200-280v-80h-80v-80h80v-80h80v80h80v80h-80v80h-80Z"/>
                                </svg>
                            </button>
                            <button className="p-2 text-gray-600 hover:bg-gray-200 rounded-md mr-2">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" className="w-5 h-5 fill-current">
                                    <path d="M240-160q-33 0-56.5-23.5T160-240v-480q0-33 23.5-56.5T240-800h320l240 240v320q0 33-23.5 56.5T720-160H240Zm280-520v-120H240v480h480v-360H520ZM240-800v200-200 480-480Z"/>
                                </svg>
                            </button>
                            <div className="flex-grow"></div>
                            <button className="p-2 text-gray-600 hover:bg-gray-200 rounded-md">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" className="w-5 h-5 fill-current">
                                    <path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Zm-40 120v-240h80v240h-80Z"/>
                                </svg>
                            </button>
                        </div>
                        
                        {/* Área del visor de PDF */}
                        <div className="flex-grow flex items-center justify-center">
                            <div className="text-center p-4">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" 
                                    className="w-16 h-16 mx-auto mb-4 text-gray-400 fill-current">
                                    <path d="M320-240h320v-80H320v80Zm0-160h320v-80H320v80ZM240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h320l240 240v480q0 33-23.5 56.5T720-80H240Zm280-520v-200H240v640h480v-440H520ZM240-800v200-200 640-640Z" />
                                </svg>
                                <p className="text-gray-600 mb-3">
                                    Archivo seleccionado: <strong>{fileName}</strong>
                                </p>
                                <p className="text-gray-500 text-sm">
                                    Visor de PDF en construcción. Aquí se mostraría el contenido del documento.
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    {/* Botones de acción */}
                    <div className="mt-4 flex justify-end">
                        <button 
                            onClick={handleUploadNew}
                            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 mr-3"
                        >
                            Volver a subida
                        </button>
                        <button className="px-4 py-2 bg-blue-900 text-white rounded-md hover:bg-blue-800">
                            Procesar documento
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}