import { PrimaryButton } from '../../../components/PrimaryButton';
import { SecondaryButton } from '../../../components/SecondaryButton';

interface Step1Props {
    onNext: () => void;
    onBack: () => void;
}

export function Step1EmailInput({ onNext, onBack }: Step1Props) {
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
                <p className="text-gray-600 mb-6">
                    Para continuar, primero debes verificar tu identidad
                </p>

                <form className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-gray-600 mb-2">
                            Ingresa tu correo electrónico:
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="w-full px-4 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            placeholder="correo@ejemplo.com"
                            required
                        />
                        <p className="mt-2 text-gray-600">
                            Asegúrate que sea el correo electrónico asociado a tu cuenta
                        </p>
                    </div>

                    <div className="flex justify-end gap-4 pt-4">
                        <SecondaryButton onClick={onBack}>
                            Volver
                        </SecondaryButton>
                        <PrimaryButton onClick={onNext}>
                            Continuar
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </div>
    );
}