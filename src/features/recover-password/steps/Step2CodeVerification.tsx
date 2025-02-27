import { useState } from 'react';
import { PrimaryButton } from '../../../components/PrimaryButton';
import { SecondaryButton } from '../../../components/SecondaryButton';

interface Step2Props {
    onNext: () => void;
    onBack: () => void;
}

export function Step2CodeVerification({ onNext, onBack }: Step2Props) {
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
                <form className="space-y-6">
                    <div>
                        <label className="block text-gray-600 mt-4 mb-6">
                            Ingresa el código que enviamos a tu correo:
                        </label>
                        {/* Inputs section */}
                        {/* 
                            En caso que se requiera que sean espacios iguales entre casillas
                            se tendra que colocar aquí "flex justify-start space-x-2 mb-6"
                            y quitar el div de la linea 88 y 104.
                        */}
                        <div className="flex justify-start mb-6">
                            {code.map((digit, index) => (
                                <div key={index} className={`${index === 3 ? 'ml-5' : 'ml-2'} ${index === 0 ? 'ml-0' : ''}`}>
                                    <input
                                        key={index}
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
                                    />
                                </div>

                            ))}
                        </div>
                    </div>

                    {/* Button section */}
                    <div className="flex justify-end gap-4 pt-[5.2rem]">
                        <SecondaryButton onClick={onBack}>
                            Volver
                        </SecondaryButton>
                        <PrimaryButton onClick={onNext}>
                            Verificar código
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </div>
    );
}