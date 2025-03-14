import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';

export function Header() {
    const navigate = useNavigate();
    const location = useLocation();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Recuperar datos del usuario (si están disponibles)
    const userData = JSON.parse(localStorage.getItem('user') || '{}');
    const userName = userData.username || userData.names || 'Usuario';
    const userEmail = userData.email || 'usuario@ejemplo.com';

    // Generar iniciales para el avatar
    const getInitials = (name: string) => {
        const names = name.split(' ');
        if (names.length > 1) {
            return `${names[0].charAt(0)}${names[1].charAt(0)}`.toUpperCase();
        }
        return name.charAt(0).toUpperCase();
    };

    // Determinar si estamos en la página de upload
    const isHomePage = location.pathname === '/home';
    const isUploadPage = location.pathname === '/upload' || location.pathname === '/viewer';
    
    const onNavigateHome = (e: React.MouseEvent) => {
        e.preventDefault();
        navigate('/home');
    };
    
    const onNavigateUpload = (e: React.MouseEvent) => {
        e.preventDefault();
        navigate('/upload');
    };

    const onNavigateAccount = (e: React.MouseEvent) => {
        e.preventDefault();
        navigate('/settings');
        setIsDropdownOpen(false);
    };

    const handleLogout = async () => {
        try {
            // Llamar al endpoint de logout en el backend
            const response = await fetch('http://localhost:8000/auth/logout', {
                method: 'POST',
                credentials: 'include', // Importante: envía las cookies con la solicitud
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                console.error('Error al cerrar sesión en el servidor');
            }
        } catch (error) {
            console.error('Error de red al cerrar sesión:', error);
        } finally {
            // Continuar con el logout en el cliente independientemente del resultado
            // Eliminar token y datos de usuario
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            
            // Redirigir al login
            navigate('/auth/login');
        }
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    // Cerrar el dropdown cuando se hace clic fuera de él
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    
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
            
            {/* Perfil de usuario con dropdown */}
            <div className="relative mr-6" ref={dropdownRef}>
                <button 
                    onClick={toggleDropdown}
                    className="flex items-center gap-2 px-3 py-2 rounded-full transition-all duration-300
                    hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    aria-label="Menú de usuario"
                >
                    {/* Avatar con gradiente y sombra */}
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-700 to-blue-900 
                    text-white font-bold text-xl flex items-center justify-center shadow-md">
                        {getInitials(userName)}
                    </div>
                    
                    <div className="hidden md:flex flex-col items-start">
                        <span className="text-gray-800 font-medium">{userName}</span>
                        <span className="text-xs text-gray-500">{userEmail}</span>
                    </div>
                    
                    <svg xmlns="http://www.w3.org/2000/svg" 
                        className={`h-5 w-5 text-gray-500 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} 
                        viewBox="0 0 20 20" 
                        fill="currentColor">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                </button>
                
                {/* Dropdown menu con animación */}
                {isDropdownOpen && (
                    <div className="absolute right-0 mt-3 w-80 bg-white rounded-xl shadow-xl z-10 overflow-hidden
                    transform origin-top-right transition-all duration-200 ease-out border border-gray-100">
                        {/* Cabecera del usuario */}
                        <div className="p-6 bg-gradient-to-r from-blue-900 to-blue-700 text-white">
                            <div className="flex items-center">
                                {/* Avatar grande */}
                                <div className="w-12 h-12 rounded-full bg-white text-blue-900 
                                font-bold text-2xl flex items-center justify-center shadow-md">
                                    {getInitials(userName)}
                                </div>
                                <div className="ml-4">
                                    <div className="text-xl font-semibold">{userName}</div>
                                    <div className="text-blue-100 text-sm">{userEmail}</div>
                                </div>
                            </div>
                        </div>
                        
                        {/* Opciones del menú */}
                        <div className="py-1">
                            <button 
                                onClick={onNavigateAccount}
                                className="w-full px-6 py-4 flex items-center text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 h-6 text-gray-500 mr-4">
                                    <path fill="currentColor" d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                                </svg>
                                <span className="text-base font-medium">Configuración de cuenta</span>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-auto text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                </svg>
                            </button>
                            
                            <div className="border-t border-gray-100"></div>
                            
                            <button 
                                onClick={handleLogout}
                                className="w-full px-6 py-4 flex items-center text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 h-6 text-gray-500 mr-4">
                                    <path fill="currentColor" d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"/>
                                </svg>
                                <span className="text-base font-medium">Cerrar sesión</span>
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
}