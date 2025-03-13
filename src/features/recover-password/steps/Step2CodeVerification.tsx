// import { useState } from 'react';
// import { PrimaryButton } from '../../../components/PrimaryButton';
// import { SecondaryButton } from '../../../components/SecondaryButton';

// interface Step2Props {
//     onNext: () => void;
//     onBack: () => void;
// }

// export function Step2CodeVerification({ onNext, onBack }: Step2Props) {
//     const [code, setCode] = useState(['', '', '', '', '', '']);

//     const handleInputChange = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
//         const input = e.target as HTMLInputElement;
//         const value = input.value;

//         // Handle backspace
//         if (e.key === 'Backspace' && !value) {
//             const prevInput = document.getElementById(`digit-${index - 1}`);
//             prevInput?.focus();
//             return;
//         }

//         // Only allow numbers
//         if (!/^\d*$/.test(value)) return;

//         // Update code array
//         const newCode = [...code];
//         newCode[index] = value;
//         setCode(newCode);

//         // Move to next input
//         if (value && index < 5) {
//             const nextInput = document.getElementById(`digit-${index + 1}`);
//             nextInput?.focus();
//         }
//     };

//     const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
//         e.preventDefault();
//         const pastedData = e.clipboardData.getData('text').replace(/[^0-9]/g, '');
//         const digits = pastedData.split('').slice(0, 6);

//         if (digits.length > 0) {
//             const newCode = [...code];
//             digits.forEach((digit, index) => {
//                 if (index < 6) newCode[index] = digit;
//             });
//             setCode(newCode);

//             // Focus last filled input or next empty one
//             const focusIndex = Math.min(digits.length, 5);
//             const nextInput = document.getElementById(`digit-${focusIndex}`);
//             nextInput?.focus();
//         }
//     };


//     return (
//         <div className="flex w-full">
//             {/* Columna izquierda - Título */}
//             <div className="w-1/2 p-10">
//                 <img
//                     src="../../src/assets/BufetePDFReaderFullLogo.png"
//                     alt="BufetePDFReader logo"
//                     className="h-24 w-auto mb-[1em]"
//                 />
//                 <h1 className="text-5xl font-medium text-gray-900 mt-8">
//                     Recuperación de contraseña
//                 </h1>
//             </div>

//             {/* Columna derecha - Formulario */}
//             <div className="w-1/2 mt-16 p-12">
//                 <form className="space-y-6">
//                     <div>
//                         <label className="block text-gray-600 mt-4 mb-6">
//                             Ingresa el código que enviamos a tu correo:
//                         </label>
//                         {/* Inputs section */}
//                         {/* 
//                             En caso que se requiera que sean espacios iguales entre casillas
//                             se tendra que colocar aquí "flex justify-start space-x-2 mb-6"
//                             y quitar el div de la linea 88 y 104.
//                         */}
//                         <div className="flex justify-start mb-6">
//                             {code.map((digit, index) => (
//                                 <div key={index} className={`${index === 3 ? 'ml-5' : 'ml-2'} ${index === 0 ? 'ml-0' : ''}`}>
//                                     <input
//                                         key={index}
//                                         id={`digit-${index}`}
//                                         type="text"
//                                         maxLength={1}
//                                         value={digit}
//                                         className="w-12 h-12 text-center border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-1 focus:border-blue-500 focus:ring-blue-500"
//                                         onKeyUp={(e) => handleInputChange(e, index)}
//                                         onPaste={handlePaste}
//                                         onChange={(e) => {
//                                             const newCode = [...code];
//                                             newCode[index] = e.target.value;
//                                             setCode(newCode);
//                                         }}
//                                     />
//                                 </div>

//                             ))}
//                         </div>
//                     </div>

//                     {/* Button section */}
//                     <div className="flex justify-end gap-4 pt-[5.2rem]">
//                         <SecondaryButton onClick={onBack}>
//                             Volver
//                         </SecondaryButton>
//                         <PrimaryButton onClick={onNext}>
//                             Verificar código
//                         </PrimaryButton>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// }

import { useState } from 'react';
import { PrimaryButton } from '../../../components/PrimaryButton';
import { SecondaryButton } from '../../../components/SecondaryButton';

interface Step2Props {
    onNext: (code: string) => void;
    onBack: () => void;
    isLoading: boolean;
    email: string;
}

export function Step2CodeVerification({ onNext, onBack, isLoading, email }: Step2Props) {
    const [code, setCode] = useState(['', '', '', '', '', '']);

    const handleInputChange = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        const input = e.target as HTMLInputElement;
        const value = input.value;

        // Handle backspace
        if (e.key === 'Backspace' && !value) {
            const prevInput = document.getElementById(`digit-${index - 1}`);
            prevInput?.focus();
            return;
        }

        // Only allow numbers
        if (!/^\d*$/.test(value)) return;

        // Update code array
        const newCode = [...code];
        newCode[index] = value;
        setCode(newCode);

        // Move to next input
        if (value && index < 5) {
            const nextInput = document.getElementById(`digit-${index + 1}`);
            nextInput?.focus();
        }
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text').replace(/[^0-9]/g, '');
        const digits = pastedData.split('').slice(0, 6);

        if (digits.length > 0) {
            const newCode = [...code];
            digits.forEach((digit, index) => {
                if (index < 6) newCode[index] = digit;
            });
            setCode(newCode);

            // Focus last filled input or next empty one
            const focusIndex = Math.min(digits.length, 5);
            const nextInput = document.getElementById(`digit-${focusIndex}`);
            nextInput?.focus();
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (code.every(digit => digit !== '')) {
            onNext(code.join(''));
        }
    };

    // Verifica si todos los dígitos han sido ingresados
    const isCodeComplete = code.every(digit => digit !== '');

    // Muestra una parte segura del email (oculta parte del dominio)
    const obfuscateEmail = (email: string) => {
        const parts = email.split('@');
        if (parts.length !== 2) return email;
        
        const username = parts[0];
        const domain = parts[1];
        
        // Muestra los primeros 3 caracteres del username si tiene más de 3
        const visibleUsername = username.length > 3 
            ? username.substring(0, 3) + '...' 
            : username;
            
        // Muestra solo el dominio de primer nivel (.com, .org, etc.)
        const domainParts = domain.split('.');
        const visibleDomain = domainParts.length > 1 
            ? '...@' + domainParts[0].substring(0, 1) + '...' + '.' + domainParts[domainParts.length - 1]
            : '...@' + domain;
            
        return visibleUsername + visibleDomain;
    };

    return (
        <div className="flex w-full">
            {/* Columna izquierda - Título */}
            <div className="w-1/2 p-10">
                <img
                    src="../../src/assets/BufetePDFReaderFullLogo.png"
                    alt="BufetePDFReader logo"
                    className="h-24 w-auto mb-[1em]"
                />
                <h1 className="text-5xl font-medium text-gray-900 mt-8">
                    Recuperación de contraseña
                </h1>
            </div>

            {/* Columna derecha - Formulario */}
            <div className="w-1/2 mt-16 p-12">
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-gray-600 mt-4 mb-2">
                            Ingresa el código de 6 dígitos que enviamos a:
                        </label>
                        <p className="text-blue-900 font-semibold mb-4">
                            {obfuscateEmail(email)}
                        </p>

                        {/* Inputs section */}
                        <div className="flex justify-start mb-6">
                            {code.map((digit, index) => (
                                <div key={index} className={`${index === 3 ? 'ml-5' : 'ml-2'} ${index === 0 ? 'ml-0' : ''}`}>
                                    <input
                                        id={`digit-${index}`}
                                        type="text"
                                        maxLength={1}
                                        value={digit}
                                        className="w-12 h-12 text-center border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-1 focus:border-blue-500 focus:ring-blue-500"
                                        onKeyUp={(e) => handleInputChange(e, index)}
                                        onPaste={handlePaste}
                                        onChange={(e) => {
                                            const newCode = [...code];
                                            newCode[index] = e.target.value;
                                            setCode(newCode);
                                        }}
                                        disabled={isLoading}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Button section */}
                    <div className="flex justify-end gap-4 pt-[3.5rem]">
                        <SecondaryButton 
                            onClick={onBack}
                            disabled={isLoading}
                        >
                            Volver
                        </SecondaryButton>
                        <PrimaryButton 
                            type="submit"
                            disabled={isLoading || !isCodeComplete}
                            className={isLoading || !isCodeComplete ? 'opacity-70 cursor-not-allowed' : ''}
                        >
                            {isLoading ? 'Verificando...' : 'Verificar código'}
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </div>
    );
}