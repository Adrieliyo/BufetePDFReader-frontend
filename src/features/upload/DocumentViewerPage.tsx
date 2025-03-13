import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Breadcrumb } from '../../components/Breadcrumb';

export function DocumentViewerPage() {
    const [fileName, setFileName] = useState<string>('');
    const [pdfUrl, setPdfUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const navigate = useNavigate();
    
    // Cargar el nombre del archivo desde localStorage y obtener el archivo
    useEffect(() => {
        setLoading(true);
        
        // Obtener el nombre del archivo
        const lastFileName = localStorage.getItem('lastUploadedFile');
        
        // Obtener el archivo en base64 (si existe)
        const pdfFile = localStorage.getItem('pdfFileData');
        
        if (lastFileName && pdfFile) {
            setFileName(lastFileName);
            
            // Crear un blob a partir de los datos base64
            try {
                const byteCharacters = atob(pdfFile.split(',')[1]);
                const byteNumbers = new Array(byteCharacters.length);
                for (let i = 0; i < byteCharacters.length; i++) {
                    byteNumbers[i] = byteCharacters.charCodeAt(i);
                }
                const byteArray = new Uint8Array(byteNumbers);
                const blob = new Blob([byteArray], { type: 'application/pdf' });
                
                // Crear un objeto URL para el blob
                const url = URL.createObjectURL(blob);
                setPdfUrl(url);
            } catch (error) {
                console.error('Error al procesar el PDF:', error);
            } finally {
                setLoading(false);
            }
        } else {
            // Si no hay archivo seleccionado, redirigir a la página de subida
            navigate('/upload');
        }
        
        // Limpiar el objeto URL cuando el componente se desmonte
        return () => {
            if (pdfUrl) {
                URL.revokeObjectURL(pdfUrl);
            }
        };
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

    // Opción para procesar el documento
    const handleProcessDocument = () => {
        // Aquí puedes agregar la lógica para procesar el documento
        alert('Procesando documento...');
        // navigate('/results'); // Ejemplo: navegar a una pantalla de resultados
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
                    <h2 className="text-xl font-semibold mb-4 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" className="w-5 h-5 mr-2 text-red-600 fill-current">
                            <path d="M320-240h320v-80H320v80Zm0-160h320v-80H320v80ZM240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h320l240 240v480q0 33-23.5 56.5T720-80H240Zm280-520v-200H240v640h480v-440H520ZM240-800v200-200 640-640Z" />
                        </svg>
                        {fileName || "Documento PDF"}
                    </h2>
                    
                    <div className="border-2 border-gray-200 rounded-lg min-h-[600px] flex flex-col">
                        {/* Barra de herramientas del visor */}
                        <div className="bg-gray-50 p-3 border-b border-gray-200 flex items-center">
                            <button 
                                className="p-2 text-gray-600 hover:bg-gray-200 rounded-md mr-2"
                                onClick={handleUploadNew}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" className="w-5 h-5 fill-current">
                                    <path d="M440-320v-326L336-542l-56-58 200-200 200 200-56 58-104-104v326h-80ZM240-160q-33 0-56.5-23.5T160-240v-120h80v120h480v-120h80v120q0 33-23.5 56.5T720-160H240Z" />
                                </svg>
                            </button>
                            <span className="text-sm text-gray-500">
                                Archivo: {fileName}
                            </span>
                            <div className="flex-grow"></div>
                            {/* <button 
                                className="p-2 text-gray-600 hover:bg-gray-200 rounded-md"
                                onClick={handleProcessDocument}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" className="w-5 h-5 fill-current">
                                    <path d="m424-296 282-282-56-56-226 226-114-114-56 56 170 170Zm56 216q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z"/>
                                </svg>
                            </button> */}
                        </div>
                        
                        {/* Área del visor de PDF */}
                        <div className="flex-grow flex items-center justify-center bg-gray-100">
                            {loading ? (
                                <div className="flex flex-col items-center justify-center p-4">
                                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-900"></div>
                                    <p className="mt-4 text-gray-600">Cargando documento...</p>
                                </div>
                            ) : pdfUrl ? (
                                <iframe
                                    src={pdfUrl}
                                    className="w-full h-full"
                                    title="PDF Viewer"
                                    style={{ minHeight: '600px' }}
                                ></iframe>
                            ) : (
                                <div className="text-center p-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" 
                                        className="w-16 h-16 mx-auto mb-4 text-gray-400 fill-current">
                                        <path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Zm0 160q33 0 56.5-23.5T560-400q0-33-23.5-56.5T480-480q-33 0-56.5 23.5T400-400q0 33 23.5 56.5T480-320Zm-160-80h80v-240h-80v240Zm240 0h80v-240h-80v240Z" />
                                    </svg>
                                    <p className="text-gray-600 mb-3">
                                        No se pudo cargar el documento
                                    </p>
                                </div>
                            )}
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
                        <button 
                            onClick={handleProcessDocument}
                            className="px-4 py-2 bg-blue-900 text-white rounded-md hover:bg-blue-800"
                        >
                            Procesar documento
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}