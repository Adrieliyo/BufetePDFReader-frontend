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

    const handleBack = () => {
        navigate('/home');
    };

    return (
        <div className="p-6">
            {/* Breadcrumb */}
            <Breadcrumb
                    items={breadcrumbItems}
                    className="mb-2"
                />
            <div className="p-6 max-w-6xl mx-auto">
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

                {/* Encabezado */}
                <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white p-8 rounded-xl mb-8 shadow-lg">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold mb-2">Subida de archivo</h1>
                            <p className="text-xl opacity-90">
                                Ingresa el archivo PDF de "Solicitud de Convenio para prácticas profesionales"
                            </p>
                        </div>
                        <button
                            onClick={handleBack}
                            className="bg-white text-blue-900 px-6 py-3 rounded-lg font-semibold flex items-center hover:bg-blue-50 transition duration-300"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" className="w-6 h-6 mr-2 fill-current">
                                <path d="M560-240 320-480l240-240 56 56-184 184 184 184-56 56Z" />
                            </svg>
                            Volver al inicio
                        </button>
                    </div>
                </section>

                <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
                    {/* Sección principal: área de subida */}
                    <div className="md:col-span-3 flex flex-col justify-center">
                        <div className="bg-white p-6 rounded-xl border-1 border-gray-300">
                            <div className="flex items-center mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"
                                    className="w-8 h-8 text-blue-900 fill-current mr-3">
                                    <path d="M440-320v-326L336-542l-56-58 200-200 200 200-56 58-104-104v326h-80ZM240-160q-33 0-56.5-23.5T160-240v-120h80v120h480v-120h80v120q0 33-23.5 56.5T720-160H240Z" />
                                </svg>
                                <h2 className="text-2xl font-semibold text-gray-800">Sube tu archivo PDF</h2>
                            </div>

                            {/* Componente de subida de archivos con soporte para drag and drop */}
                            <div
                                className={`mt-4 border-2 border-dashed ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                                    } p-8 rounded-xl text-center transition-colors duration-200 cursor-pointer hover:bg-gray-50`}
                                onDragEnter={handleDragEnter}
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                                onDrop={handleDrop}
                                onClick={() => fileInputRef.current?.click()}
                            >
                                <div className="flex flex-col items-center">
                                    <div className={`w-20 h-20 mb-4 rounded-full flex items-center justify-center ${isDragging ? 'bg-blue-100' : 'bg-gray-100'}`}>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"
                                            className={`w-12 h-12 ${isDragging ? 'text-blue-500' : 'text-gray-400'} fill-current`}
                                        >
                                            <path d="M440-320v-326L336-542l-56-58 200-200 200 200-56 58-104-104v326h-80ZM240-160q-33 0-56.5-23.5T160-240v-120h80v120h480v-120h80v120q0 33-23.5 56.5T720-160H240Z" />
                                        </svg>
                                    </div>
                                    <p className="mb-2 text-lg font-medium text-gray-700">
                                        <span className="font-semibold text-blue-900">Haz clic para subir</span> o arrastra y suelta
                                    </p>
                                    <p className="text-sm text-gray-500 mb-4">
                                        Archivos PDF (MAX. 10MB)
                                    </p>

                                    {/* <div className="w-full max-w-xs bg-gray-100 h-0.5 mb-4"></div> */}

                                    <p className="text-xs text-gray-500 italic">
                                        Asegúrate que el PDF contenga texto seleccionable y no imágenes
                                    </p>

                                    <input
                                        type="file"
                                        id="file-upload"
                                        ref={fileInputRef}
                                        className="hidden"
                                        accept=".pdf,application/pdf"
                                        onChange={handleFileChange}
                                    />
                                </div>
                            </div>

                            <div className="flex justify-center mt-6">
                                <label
                                    htmlFor="file-upload"
                                    className="px-6 py-3 bg-blue-900 text-white rounded-lg font-medium hover:bg-blue-800 transition-colors duration-300 cursor-pointer flex items-center"
                                    onClick={(e) => e.stopPropagation()} // Evitar que el clic en el botón se propague al div padre
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"
                                        className="w-6 h-6 mr-2 fill-current">
                                        <path d="M440-320v-326L336-542l-56-58 200-200 200 200-56 58-104-104v326h-80ZM240-160q-33 0-56.5-23.5T160-240v-120h80v120h480v-120h80v120q0 33-23.5 56.5T720-160H240Z" />
                                    </svg>
                                    Seleccionar archivo PDF
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Información adicional */}
                    <div className="md:col-span-2">
                        <div className="bg-white p-6 rounded-xl shadow-md mb-6">
                            <div className="flex items-center mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"
                                    className="w-8 h-8 text-blue-900 fill-current mr-3">
                                    <path d="M440-280h80v-240h-80v240Zm40-320q17 0 28.5-11.5T520-640q0-17-11.5-28.5T480-680q-17 0-28.5 11.5T440-640q0 17 11.5 28.5T480-600Zm0 520q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
                                </svg>
                                <h2 className="text-2xl font-semibold text-gray-800">Instrucciones</h2>
                            </div>

                            <ol className="space-y-4 mb-4 pl-2">
                                <li className="flex items-start">
                                    <span className="bg-blue-900 text-white rounded-full w-6 h-6 flex items-center justify-center font-bold mr-3 mt-0.5 flex-shrink-0">1</span>
                                    <p className="text-gray-600"><span className="font-semibold text-blue-900">Selecciona un archivo</span> PDF de "Solicitud de Convenio para prácticas profesionales".</p>
                                </li>
                                <li className="flex items-start">
                                    <span className="bg-blue-900 text-white rounded-full w-6 h-6 flex items-center justify-center font-bold mr-3 mt-0.5 flex-shrink-0">2</span>
                                    <p className="text-gray-600"><span className="font-semibold text-blue-900">Verifica</span> que sea el documento correcto en la vista previa.</p>
                                </li>
                                <li className="flex items-start">
                                    <span className="bg-blue-900 text-white rounded-full w-6 h-6 flex items-center justify-center font-bold mr-3 mt-0.5 flex-shrink-0">3</span>
                                    <p className="text-gray-600"><span className="font-semibold text-blue-900">Procesa</span> el documento para generar el convenio Word correspondiente.</p>
                                </li>
                            </ol>
                        </div>

                        <div className="bg-blue-50 border border-blue-200 p-6 rounded-xl">
                            <div className="flex items-center mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"
                                    className="w-8 h-8 text-blue-900 fill-current mr-3">
                                    <path d="M320-240h320v-80H320v80Zm0-160h320v-80H320v80ZM240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h320l240 240v480q0 33-23.5 56.5T720-80H240Zm280-520v-200H240v640h480v-440H520ZM240-800v200-200 640-640Z" />
                                </svg>
                                <h2 className="text-xl font-semibold text-blue-900">¿Para qué sirve?</h2>
                            </div>

                            <p className="text-blue-800 mb-3">
                                Este procesador extrae automáticamente datos del PDF de solicitud para generar:
                            </p>

                            <ul className="list-disc list-inside text-blue-800 space-y-1 pl-2">
                                <li>Convenio remunerado</li>
                                <li>Convenio no remunerado</li>
                            </ul>

                            <p className="text-blue-800 mt-3">
                                Basado en los datos detectados en el documento, el sistema seleccionará la plantilla adecuada.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Nota importante */}
                <div className="mt-8 bg-gray-100 border border-gray-300 rounded-xl p-5">
                    <div className="flex items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"
                            className="w-6 h-6 text-amber-600 fill-current mr-3 flex-shrink-0 mt-1">
                            <path d="M440-280h80v-240h-80v240Zm40-320q17 0 28.5-11.5T520-640q0-17-11.5-28.5T480-680q-17 0-28.5 11.5T440-640q0 17 11.5 28.5T480-600Zm0 520q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
                        </svg>
                        <div>
                            <h3 className="text-lg font-semibold text-gray-800 mb-1">Importante</h3>
                            <p className="text-gray-600">
                                Este lector de PDF funciona exclusivamente para recopilar datos del archivo de "Solicitud de Convenio para prácticas profesionales".
                                Cualquier otro archivo PDF no será procesado correctamente.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}