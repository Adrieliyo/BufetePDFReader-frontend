import { useNavigate, useLocation } from 'react-router-dom';

export function Header() {
    const navigate = useNavigate();
    const location = useLocation();

    // Determinar si estamos en la página de upload
    const isHomePage = location.pathname === '/home';
    const isUploadPage = location.pathname === '/upload' || location.pathname === '/viewer';


    const onNavigateHome = (e: React.MouseEvent) => {
        e.preventDefault();
        navigate('/home');
    };

    const onNavigateUpload = (e: React.MouseEvent) => {
        e.preventDefault();
        navigate('/upload'); // Navegar a la página de upload
    };

    return (
        <header className="flex items-center justify-between p-2 bg-white shadow-sm">
            <div className="flex items-center mx-7">
                {/* Logo and Brand */}
                <div className="flex items-center">
                    <img
                        src="../../src/assets/BufetePDFReaderFullLogo.png"
                        alt="BufetePDF Logo"
                        className="h-20 w-auto"
                    />
                </div>

                {/* Navigation */}
                <nav className="flex items-center space-x-6 ml-10">
                    <button
                        onClick={onNavigateHome}
                        className={`flex items-end gap-2 transition-all duration-500 ease-in-out text-lg font-medium pl-4 px-5 py-3 rounded-2xl
                            ${isHomePage
                                ? 'bg-blue-900 text-white hover:bg-blue-800'
                                : 'bg-transparent text-gray-600 hover:text-gray-900'
                            }`}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                            className="h-8 w-8 fill-current" fill="currentColor">
                            <path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z" />
                            <path d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z" />
                        </svg>
                        <span>Inicio</span>
                    </button>


                    <button
                        onClick={onNavigateUpload}
                        className={`flex items-center gap-2 transition-all duration-500 ease-in-out text-lg font-medium pl-2 px-4 py-2 rounded-2xl
                        ${isUploadPage
                            ? 'bg-blue-900 text-white hover:bg-blue-800'
                            : 'bg-transparent text-gray-600 hover:text-gray-900'
                        }`}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"
                            className="h-9 w-9 fill-current" fill="currentColor">
                            <path d="M440-320v-326L336-542l-56-58 200-200 200 200-56 58-104-104v326h-80ZM240-160q-33 0-56.5-23.5T160-240v-120h80v120h480v-120h80v120q0 33-23.5 56.5T720-160H240Z" />
                        </svg>

                        <span>Subida de archivo</span>
                    </button>
                </nav>


            </div>

            {/* Upload Button */}
            {/* <button
                onClick={onNavigateFileUpload}
                className="flex items-center bg-blue-700 text-white px-4 py-2 rounded-md hover:bg-blue-800"
            >
                <span className="material-icons mr-1">upload</span>
                <span>Subida de archivos</span>
            </button> */}
        </header>
    );
}