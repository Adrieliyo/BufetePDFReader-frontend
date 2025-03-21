// import { useState } from 'react';
// import { PrimaryButton } from '../../../components/PrimaryButton';
// import { SecondaryButton } from '../../../components/SecondaryButton';

// interface Step3Props {
//     onNext: () => void;
//     onBack: () => void;
// }

// export function Step3NewPassword({ onNext, onBack }: Step3Props) {
//     const [showNewPassword, setShowNewPassword] = useState(false);
//     const [showConfirmPassword, setShowConfirmPassword] = useState(false);

//     return (
//         <div className="w-full h-full relative">
//             {/* Logo en esquina superior izquierda */}
//             <div className="absolute top-6 left-6">
//                 <img
//                     src="../../src/assets/BufetePDFReaderFullLogo.png"
//                     alt="BufetePDFReader logo"
//                     className="h-24 w-auto"
//                 />
//             </div>

//             {/* Contenedor principal centrado */}
//             <div className="w-full max-w-sm mx-auto pt-8">
//                 <h1 className="text-4xl font-medium text-gray-900 text-center mb-10">
//                     Nueva contraseña
//                 </h1>

//                 <form className="space-y-6">
//                     <div className="relative">
//                         <label htmlFor="new-password" className="block text-gray-600 mb-2">
//                             Nueva contraseña:
//                         </label>
//                         <input
//                             type={showNewPassword ? 'text' : 'password'}
//                             id="new-password"
//                             className="w-full px-4 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
//                             placeholder="Ingresa tu nueva contraseña"
//                         />
//                         <button
//                             type="button"
//                             onClick={() => setShowNewPassword(!showNewPassword)}
//                             className="absolute right-3 top-[2.6rem] text-gray-500 focus:outline-none"
//                         >
//                             {showNewPassword ? (
//                                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
//                                     <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
//                                 </svg>
//                             ) : (
//                                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
//                                     <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
//                                     <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
//                                 </svg>
//                             )}
//                         </button>
//                     </div>

//                     <div className="relative">
//                         <label htmlFor="confirm-password" className="block text-gray-600 mb-2">
//                             Confirmar contraseña:
//                         </label>
//                         <input
//                             type={showConfirmPassword ? 'text' : 'password'}
//                             id="confirm-password"
//                             className="w-full px-4 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
//                             placeholder="Confirma tu nueva contraseña"
//                         />
//                         <button
//                             type="button"
//                             onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                             className="absolute right-3 top-[2.6rem] text-gray-500 focus:outline-none"
//                         >
//                             {showConfirmPassword ? (
//                                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
//                                     <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
//                                 </svg>
//                             ) : (
//                                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
//                                     <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
//                                     <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
//                                 </svg>
//                             )}
//                         </button>
//                     </div>


//                 </form>

//                 <div className="flex absolute bottom-[1.5rem] right-0 mr-12 gap-4 justify-end pt-4">
//                     <SecondaryButton onClick={onBack}>
//                         Cancelar
//                     </SecondaryButton>
//                     <PrimaryButton onClick={onNext}>
//                         Cambiar contraseña
//                     </PrimaryButton>
//                 </div>
//             </div>
//         </div>
//     );
// }

import { useState } from 'react';
import { PrimaryButton } from '../../../components/PrimaryButton';
import { SecondaryButton } from '../../../components/SecondaryButton';

interface Step3Props {
    onNext: (password: string) => void;
    onBack: () => void;
    isLoading: boolean;
}

export function Step3NewPassword({ onNext, onBack, isLoading }: Step3Props) {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [errors, setErrors] = useState<{password?: string, confirmPassword?: string}>({});

    // Validación de contraseña
    const validatePassword = (pwd: string): boolean => {
        // Contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
        return passwordRegex.test(pwd);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        // Resetear errores
        const newErrors: {password?: string, confirmPassword?: string} = {};
        
        // Validar contraseña
        if (!validatePassword(password)) {
            newErrors.password = 'La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número';
        }
        
        // Validar que las contraseñas coincidan
        if (password !== confirmPassword) {
            newErrors.confirmPassword = 'Las contraseñas no coinciden';
        }
        
        setErrors(newErrors);
        
        // Si no hay errores, continuar
        if (Object.keys(newErrors).length === 0) {
            onNext(password);
        }
    };

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

            {/* Contenedor principal centrado */}
            <div className="w-full max-w-md mx-auto pt-8">
                <h1 className="text-4xl font-medium text-gray-900 text-center mb-4">
                    Crear nueva contraseña
                </h1>

                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="relative">
                        <label htmlFor="new-password" className="block text-gray-600 mb-2">
                            Nueva contraseña:
                        </label>
                        <input
                            type={showNewPassword ? 'text' : 'password'}
                            id="new-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={`w-full px-4 py-2 border-2 ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500`}
                            placeholder="Ingresa tu nueva contraseña"
                            disabled={isLoading}
                        />
                        <button
                            type="button"
                            onClick={() => setShowNewPassword(!showNewPassword)}
                            className="absolute right-3 top-[2.6rem] text-gray-500 focus:outline-none"
                            disabled={isLoading}
                        >
                            {showNewPassword ? (
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            )}
                        </button>
                        {errors.password && (
                            <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                        )}
                        {/* <p className="mt-1 text-xs text-gray-500">
                            La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número.
                        </p> */}
                    </div>

                    <div className="relative">
                        <label htmlFor="confirm-password" className="block text-gray-600 mb-2">
                            Confirmar contraseña:
                        </label>
                        <input
                            type={showConfirmPassword ? 'text' : 'password'}
                            id="confirm-password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className={`w-full px-4 py-2 border-2 ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500`}
                            placeholder="Confirma tu nueva contraseña"
                            disabled={isLoading}
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 top-[2.6rem] text-gray-500 focus:outline-none"
                            disabled={isLoading}
                        >
                            {showConfirmPassword ? (
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            )}
                        </button>
                        {errors.confirmPassword && (
                            <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
                        )}
                    </div>

                    <div className="flex absolute bottom-[1.5rem] right-0 mr-12 gap-4 justify-end pt-4">
                        <SecondaryButton 
                            onClick={onBack}
                            disabled={isLoading}
                        >
                            Volver
                        </SecondaryButton>
                        <PrimaryButton 
                            type="submit"
                            disabled={isLoading || !password || !confirmPassword}
                            className={isLoading ? 'opacity-70 cursor-not-allowed' : ''}
                        >
                            {isLoading ? 'Procesando...' : 'Cambiar contraseña'}
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </div>
    );
}