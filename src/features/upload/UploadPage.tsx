import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Breadcrumb } from '../../components/Breadcrumb';

export function UploadPage() {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const navigate = useNavigate();

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

    const breadcrumbItems = [
        {
            icon: uploadIcon,
            label: "Subida de archivos",
            onClick: undefined // Ya estamos en esta página
        },
        {
            icon: pdfIcon,
            label: "Ingresar PDF",
            onClick: undefined // Este paso es parte del mismo proceso
        }
    ];

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setSelectedFile(file);
            
            // Guardar el nombre del archivo en localStorage
            localStorage.setItem('lastUploadedFile', file.name);
            
            // Navegar directamente al visor de documentos
            navigate('/viewer');
        }
    };

    return (
        <div className="p-6">
            {/* Breadcrumb */}
            <Breadcrumb
                items={breadcrumbItems}
                className="mb-6"
            />

            <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-800 mb-4">
                    Subida de Archivos
                </h1>

                <div className="bg-white p-6 rounded-lg shadow-md">
                    <p className="text-gray-600 mb-4">
                        Selecciona archivos PDF para subirlos al sistema.
                    </p>
                    
                    {/* Componente de subida de archivos */}
                    <div className="border-2 border-dashed border-gray-300 p-8 rounded-lg text-center">
                        <div className="flex flex-col items-center">
                            <svg className="w-12 h-12 text-gray-400 mb-3 fill-current" viewBox="0 -960 960 960" xmlns="http://www.w3.org/2000/svg">
                                <path d="M480-345 240-585l56-56 184 184 184-184 56 56-240 240ZM240-225v-80h480v80H240Z" />
                            </svg>
                            <p className="mb-2 text-sm text-gray-500">
                                <span className="font-semibold">Haz clic para subir</span> o arrastra y suelta
                            </p>
                            <p className="text-xs text-gray-500">
                                PDF (MAX. 10MB)
                            </p>
                            <input
                                type="file"
                                id="file-upload"
                                className="hidden"
                                accept=".pdf"
                                onChange={handleFileChange}
                            />
                            <label
                                htmlFor="file-upload"
                                className="mt-4 px-4 py-2 bg-blue-900 text-white rounded-md hover:bg-blue-800 transition-colors duration-300 cursor-pointer flex items-center"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"
                                    className="w-5 h-5 mr-2 fill-current">
                                    <path d="M440-320v-326L336-542l-56-58 200-200 200 200-56 58-104-104v326h-80ZM240-160q-33 0-56.5-23.5T160-240v-120h80v120h480v-120h80v120q0 33-23.5 56.5T720-160H240Z" />
                                </svg>
                                Seleccionar archivo
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}