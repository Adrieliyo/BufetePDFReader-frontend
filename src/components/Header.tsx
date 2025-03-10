import { useNavigate } from 'react-router-dom';

export function Header()  {
    const navigate = useNavigate();

    const onNavigateHome = (e: React.MouseEvent) => {
      e.preventDefault();
      navigate('/auth/register');
    };
  
    const onNavigateFileUpload = (e: React.MouseEvent) => {
      e.preventDefault();
      navigate('/recover-password');
    };

    return (
        <header className="flex items-center justify-between p-2 bg-white shadow-sm">
            <div className="flex items-center">
                {/* Logo and Brand */}
                <div className="flex items-center mr-4">
                    <img
                        src="/logo.png"
                        alt="BufetePDF Logo"
                        className="h-10 w-10"
                    />
                    <span className="ml-2 font-bold text-gray-800">BufetePDF</span>
                </div>

                {/* Navigation */}
                <nav className="flex items-center space-x-4">
                    <button
                        onClick={onNavigateHome}
                        className="flex items-center text-gray-700 hover:text-gray-900"
                    >
                        <span className="material-icons mr-1">home</span>
                        <span>Inicio</span>
                    </button>
                </nav>
            </div>

            {/* Upload Button */}
            <button
                onClick={onNavigateFileUpload}
                className="flex items-center bg-blue-700 text-white px-4 py-2 rounded-md hover:bg-blue-800"
            >
                <span className="material-icons mr-1">upload</span>
                <span>Subida de archivos</span>
            </button>
        </header>
    );
}