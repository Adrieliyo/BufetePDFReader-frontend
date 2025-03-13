import { useState, useRef, DragEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Breadcrumb } from '../../components/Breadcrumb';
import { AlertModal } from '../../components/AlertModal';

export function UploadPage() {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();
    const [fileToProcess, setFileToProcess] = useState<File | null>(null);

    // Estado para el modal de alerta
    const [alertModal, setAlertModal] = useState({
        isOpen: false,
        title: '',
        message: '',
        type: 'info' as 'success' | 'error' | 'warning' | 'info'
    });

    // Estado para el modal de confirmación
    const [confirmModal, setConfirmModal] = useState({
        isOpen: false,
        title: 'Importante',
        message: 'Recuerda que tiene que ser un archivo PDF tipado en Word y no una imagen sobrepuesta dentro del Word.',
        type: 'info' as 'success' | 'error' | 'warning' | 'info'
    });

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
            label: "Subida de archivo",
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
            preProcessFile(e.target.files[0]);
        }
    };

    const preProcessFile = (file: File) => {
        // Verificar que sea un archivo PDF
        if (file.type !== 'application/pdf') {
            // alert('Por favor, sube solo archivos PDF.'); // Comentario original del alert
            setAlertModal({
                isOpen: true,
                title: 'Formato no válido',
                message: 'Por favor, sube solo archivos PDF.',
                type: 'warning'
            });
            return;
        }

        // Verificar el tamaño del archivo (máximo 10MB)
        const MAX_FILE_SIZE_MB = 10;
        const fileSizeMB = file.size / (1024 * 1024);
        if (fileSizeMB > MAX_FILE_SIZE_MB) {
            // alert(`El archivo es demasiado grande. El tamaño máximo es de ${MAX_FILE_SIZE_MB}MB.`); // Comentario original del alert
            setAlertModal({
                isOpen: true,
                title: 'Archivo demasiado grande',
                message: `El archivo es demasiado grande. El tamaño máximo es de ${MAX_FILE_SIZE_MB}MB.`,
                type: 'warning'
            });
            return;
        }

        // Guardar el archivo temporalmente y mostrar el modal de confirmación
        setFileToProcess(file);
        setConfirmModal(prev => ({ ...prev, isOpen: true }));
    };

    const processFile = (file: File) => {
        setSelectedFile(file);
    
        // Guardar el nombre del archivo en localStorage
        localStorage.setItem('lastUploadedFile', file.name);
    
        // Guardar el contenido del archivo como base64 en localStorage
        const reader = new FileReader();
        reader.onload = (event) => {
            if (event.target && event.target.result) {
                // Guardar el archivo en base64
                localStorage.setItem('pdfFileData', event.target.result.toString());
                
                // Navegar al visor de documentos
                navigate('/viewer');
            }
        };
        reader.onerror = (error) => {
            console.error('Error al leer el archivo:', error);
            setAlertModal({
                isOpen: true,
                title: 'Error de lectura',
                message: 'No se pudo leer el archivo PDF.',
                type: 'error'
            });
        };
        
        // Leer el archivo como una URL de datos (data URL)
        reader.readAsDataURL(file);
    };

    // Manejadores de eventos para drag and drop
    const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    };

    const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    };

    const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    };

    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
        
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            const file = e.dataTransfer.files[0];
            // Verificar que sea un archivo PDF
            if (file.type === 'application/pdf') {
                preProcessFile(file);
            } else {
                // alert('Por favor, sube solo archivos PDF.'); // Comentario original del alert
                setAlertModal({
                    isOpen: true,
                    title: 'Formato no válido',
                    message: 'Por favor, sube solo archivos PDF.',
                    type: 'warning'
                });
            }
        }
    };

    const closeAlertModal = () => {
        setAlertModal({ ...alertModal, isOpen: false });
    };

    const handleConfirmUpload = () => {
        if (fileToProcess) {
            processFile(fileToProcess);
        }
        setConfirmModal(prev => ({ ...prev, isOpen: false }));
    };

    const handleCancelUpload = () => {
        setFileToProcess(null);
        setConfirmModal(prev => ({ ...prev, isOpen: false }));
    };

    return (
        <div className="p-6">
            {/* Breadcrumb */}
            <Breadcrumb
                items={breadcrumbItems}
                className="mb-6"
            />

            {/* Modal de alerta */}
            <AlertModal
                isOpen={alertModal.isOpen}
                onClose={closeAlertModal}
                title={alertModal.title}
                message={alertModal.message}
                type={alertModal.type}
                autoClose={3000} // Cerrar automáticamente después de 3 segundos
            />

            {/* Modal de confirmación */}
            <AlertModal
                isOpen={confirmModal.isOpen}
                onClose={handleCancelUpload}
                title={confirmModal.title}
                message={confirmModal.message}
                type={confirmModal.type}
                confirmButtonText="Continuar"
                showCancelButton={true}
                cancelButtonText="Cancelar"
                onConfirm={handleConfirmUpload}
                onCancel={handleCancelUpload}
            />

            <div className="max-w-6xl mx-auto">
                <h1 className="text-4xl text-center font-medium text-gray-800 mb-4 mx-auto max-w-3xl">
                    Recopilador de datos del PDF "Solicitud de Convenio para prácticas profesionales"
                </h1>

                {/* Componente de subida de archivos con soporte para drag and drop */}
                <div 
                    className={`max-w-4xl mx-auto mt-8 mb-8 border-2 border-dashed ${
                        isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-400'
                    } p-8 rounded-xl text-center transition-colors duration-200 cursor-pointer`}
                    onDragEnter={handleDragEnter}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                >
                    <div className="flex flex-col items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"
                            className={`w-12 h-12 ${isDragging ? 'text-blue-500' : 'text-gray-400'} mb-3 fill-current`}
                        >
                            <path d="M440-320v-326L336-542l-56-58 200-200 200 200-56 58-104-104v326h-80ZM240-160q-33 0-56.5-23.5T160-240v-120h80v120h480v-120h80v120q0 33-23.5 56.5T720-160H240Z" />
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
                            ref={fileInputRef}
                            className="hidden"
                            accept=".pdf,application/pdf"
                            onChange={handleFileChange}
                        />
                        <label
                            htmlFor="file-upload"
                            className="mt-4 px-4 py-2 bg-blue-900 text-white rounded-md hover:bg-blue-800 transition-colors duration-300 cursor-pointer flex items-center"
                            onClick={(e) => e.stopPropagation()} // Evitar que el clic en el botón se propague al div padre
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"
                                className="w-5 h-5 mr-2 fill-current">
                                <path d="M440-320v-326L336-542l-56-58 200-200 200 200-56 58-104-104v326h-80ZM240-160q-33 0-56.5-23.5T160-240v-120h80v120h480v-120h80v120q0 33-23.5 56.5T720-160H240Z" />
                            </svg>
                            Seleccionar archivo
                        </label>
                    </div>
                </div>

                <div className="max-w-4xl mx-auto bg-gray-200 text-gray-500 font-mono border-3 border-gray-400 rounded-md p-5">
                    <p className="text-lg text-justify">
                        Este lector de PDF funciona para recopilar ciertos datos del archivo de "Solicitud de Convenio para prácticas profesionales",
                        para posteriormente colocar dichos datos dentro de una plantilla Word dependiendo si el convenio es remunerado o no.
                    </p>
                    <p className="text-lg mt-2 text-justify">
                        Cualquier otro archivo PDF distinto a la "Solicitud de Convenio para prácticas profesionales" no será procesado.
                    </p>
                </div>
            </div>
        </div>
    );
}