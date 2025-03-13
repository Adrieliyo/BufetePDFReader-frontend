// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Step1EmailInput } from './steps/Step1EmailInput';
// import { Step2CodeVerification } from './steps/Step2CodeVerification';
// import { Step3NewPassword } from './steps/Step3NewPassword';
// import { Step4VerificationPage } from './steps/Step4VerificationPage';

// export function RecoverPasswordPage() {
//     const [step, setStep] = useState(1);
//     const navigate = useNavigate();

//     const handleNext = () => {
//         if (step < 4) {
//             setStep(step + 1);
//         }
//     };

//     const handleBack = () => {
//         if (step > 1) {
//             setStep(step - 1);
//         } else {
//             navigate('/auth/login');
//         }
//     };

//     const renderStep = () => {
//         switch (step) {
//             case 1:
//                 return <Step1EmailInput onNext={handleNext} onBack={handleBack} />;
//             case 2:
//                 return <Step2CodeVerification onNext={handleNext} onBack={handleBack} />;
//             case 3:
//                 return <Step3NewPassword onNext={handleNext} onBack={handleBack} />;
//             case 4:
//                 return <Step4VerificationPage onComplete={() => navigate('/auth/login')} />;
//         }
//     };

//     return (
//         <div className="w-full h-full">
//             {renderStep()}
//         </div>
//     );
// }

// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Step1EmailInput } from './steps/Step1EmailInput';
// import { Step2CodeVerification } from './steps/Step2CodeVerification';
// import { Step3NewPassword } from './steps/Step3NewPassword';
// import { Step4VerificationPage } from './steps/Step4VerificationPage';
// import { AlertModal } from '../../components/AlertModal';
// import { requestPasswordReset, verifyResetCode, resetPassword } from '../../services/passwordResetService';

// export function RecoverPasswordPage() {
//     const [step, setStep] = useState(1);
//     const navigate = useNavigate();
//     const [isLoading, setIsLoading] = useState(false);
    
//     // Estado compartido entre pasos
//     const [email, setEmail] = useState('');
//     const [verificationCode, setVerificationCode] = useState('');
    
//     // Estado para el modal de alertas
//     const [alertModal, setAlertModal] = useState({
//         isOpen: false,
//         title: '',
//         message: '',
//         type: 'info' as 'success' | 'error' | 'warning' | 'info'
//     });

//     // Paso 1: Solicitar código de recuperación
//     const handleRequestCode = async (userEmail: string) => {
//         setIsLoading(true);
//         try {
//             // Guardamos el email para los siguientes pasos
//             setEmail(userEmail);
            
//             await requestPasswordReset(userEmail);
            
//             // Mostrar modal de éxito
//             setAlertModal({
//                 isOpen: true,
//                 title: 'Código enviado',
//                 message: 'Si el correo existe en nuestro sistema, recibirás un código de recuperación en breve.',
//                 type: 'success'
//             });
            
//             // Avanzar al siguiente paso
//             setStep(2);
//         } catch (error) {
//             // Mostrar error
//             setAlertModal({
//                 isOpen: true,
//                 title: 'Error',
//                 message: error instanceof Error ? error.message : 'Ha ocurrido un error. Intenta nuevamente.',
//                 type: 'error'
//             });
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     // Paso 2: Verificar código
//     const handleVerifyCode = async (code: string) => {
//         setIsLoading(true);
//         try {
//             // Convertir array a string (si es necesario) y unir los dígitos
//             const codeString = Array.isArray(code) ? code.join('') : code;
//             setVerificationCode(codeString);
            
//             await verifyResetCode(email, codeString);
            
//             // Avanzar al siguiente paso
//             setStep(3);
//         } catch (error) {
//             // Mostrar error
//             setAlertModal({
//                 isOpen: true,
//                 title: 'Error',
//                 message: error instanceof Error ? error.message : 'Código inválido o expirado.',
//                 type: 'error'
//             });
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     // Paso 3: Cambiar contraseña
//     const handleResetPassword = async (password: string) => {
//         setIsLoading(true);
//         try {
//             await resetPassword(email, verificationCode, password);
            
//             // Avanzar al paso final
//             setStep(4);
//         } catch (error) {
//             // Mostrar error
//             setAlertModal({
//                 isOpen: true,
//                 title: 'Error',
//                 message: error instanceof Error ? error.message : 'No se pudo actualizar la contraseña.',
//                 type: 'error'
//             });
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     const handleBack = () => {
//         if (step > 1) {
//             setStep(step - 1);
//         } else {
//             navigate('/auth/login');
//         }
//     };

//     const closeModal = () => {
//         setAlertModal(prev => ({ ...prev, isOpen: false }));
//     };

//     const renderStep = () => {
//         switch (step) {
//             case 1:
//                 return (
//                     <Step1EmailInput 
//                         onNext={handleRequestCode} 
//                         onBack={handleBack}
//                         isLoading={isLoading}
//                     />
//                 );
//             case 2:
//                 return (
//                     <Step2CodeVerification 
//                         onNext={handleVerifyCode} 
//                         onBack={handleBack}
//                         isLoading={isLoading}
//                         email={email}
//                     />
//                 );
//             case 3:
//                 return (
//                     <Step3NewPassword 
//                         onNext={handleResetPassword} 
//                         onBack={handleBack}
//                         isLoading={isLoading}
//                     />
//                 );
//             case 4:
//                 return (
//                     <Step4VerificationPage 
//                         onComplete={() => navigate('/auth/login')} 
//                     />
//                 );
//             default:
//                 return null;
//         }
//     };

//     return (
//         <div className="w-full h-full">
//             <AlertModal
//                 isOpen={alertModal.isOpen}
//                 onClose={closeModal}
//                 title={alertModal.title}
//                 message={alertModal.message}
//                 type={alertModal.type}
//             />
//             {renderStep()}
//         </div>
//     );
// }

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Step1EmailInput } from './steps/Step1EmailInput';
import { Step2CodeVerification } from './steps/Step2CodeVerification';
import { Step3NewPassword } from './steps/Step3NewPassword';
import { Step4VerificationPage } from './steps/Step4VerificationPage';
import { AlertModal } from '../../components/AlertModal';
import { requestPasswordReset, verifyResetCode, resetPassword } from '../../services/passwordResetService';

export function RecoverPasswordPage() {
    const [step, setStep] = useState(1);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    
    // Estado compartido entre pasos
    const [email, setEmail] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
    
    // Estado para el modal de alertas
    const [alertModal, setAlertModal] = useState({
        isOpen: false,
        title: '',
        message: '',
        type: 'info' as 'success' | 'error' | 'warning' | 'info'
    });

    // Paso 1: Solicitar código de recuperación
    const handleRequestCode = async (userEmail: string) => {
        setIsLoading(true);
        try {
            // Guardamos el email para los siguientes pasos
            setEmail(userEmail);
            
            await requestPasswordReset(userEmail);
            
            // Mostrar modal de éxito
            setAlertModal({
                isOpen: true,
                title: 'Código enviado',
                message: 'Si el correo existe en nuestro sistema, recibirás un código de recuperación en breve.',
                type: 'success'
            });
            
            // Avanzar al siguiente paso
            setStep(2);
        } catch (error) {
            console.error('Error al solicitar código:', error);
            
            // Extraer mensaje de error
            let errorMessage = 'Ha ocurrido un error. Intenta nuevamente.';
            if (error instanceof Error) {
                // Si el error es "Has excedido el número máximo de intentos"
                if (error.message.includes('excedido')) {
                    errorMessage = error.message;
                } else if (error.message.includes('válido')) {
                    // Si el error es "Ya tienes un código válido"
                    errorMessage = error.message;
                }
            }
            
            // Mostrar error
            setAlertModal({
                isOpen: true,
                title: 'Error',
                message: errorMessage,
                type: 'error'
            });
        } finally {
            setIsLoading(false);
        }
    };

    // Paso 2: Verificar código
    const handleVerifyCode = async (code: string) => {
        setIsLoading(true);
        try {
            setVerificationCode(code);
            
            await verifyResetCode(email, code);
            
            // Avanzar al siguiente paso
            setStep(3);
        } catch (error) {
            console.error('Error al verificar código:', error);
            
            // Extraer mensaje de error
            let errorMessage = 'Código inválido o expirado.';
            if (error instanceof Error) {
                if (error.message.includes('expirado') || error.message.includes('inválido')) {
                    errorMessage = error.message;
                }
            }
            
            // Mostrar error
            setAlertModal({
                isOpen: true,
                title: 'Error de verificación',
                message: errorMessage,
                type: 'error'
            });
        } finally {
            setIsLoading(false);
        }
    };

    // Paso 3: Cambiar contraseña
    const handleResetPassword = async (password: string) => {
        setIsLoading(true);
        try {
            await resetPassword(email, verificationCode, password);
            
            // Avanzar al paso final
            setStep(4);
        } catch (error) {
            console.error('Error al restablecer contraseña:', error);
            
            // Extraer mensaje de error
            let errorMessage = 'No se pudo actualizar la contraseña.';
            if (error instanceof Error) {
                errorMessage = error.message || errorMessage;
            }
            
            // Mostrar error
            setAlertModal({
                isOpen: true,
                title: 'Error',
                message: errorMessage,
                type: 'error'
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleBack = () => {
        if (step > 1) {
            setStep(step - 1);
        } else {
            navigate('/auth/login');
        }
    };

    const closeModal = () => {
        setAlertModal(prev => ({ ...prev, isOpen: false }));
    };

    const renderStep = () => {
        switch (step) {
            case 1:
                return (
                    <Step1EmailInput 
                        onNext={handleRequestCode} 
                        onBack={handleBack}
                        isLoading={isLoading}
                    />
                );
            case 2:
                return (
                    <Step2CodeVerification 
                        onNext={handleVerifyCode} 
                        onBack={handleBack}
                        isLoading={isLoading}
                        email={email}
                    />
                );
            case 3:
                return (
                    <Step3NewPassword 
                        onNext={handleResetPassword} 
                        onBack={handleBack}
                        isLoading={isLoading}
                    />
                );
            case 4:
                return (
                    <Step4VerificationPage 
                        onComplete={() => navigate('/auth/login')} 
                    />
                );
            default:
                return null;
        }
    };

    return (
        <div className="w-full h-full">
            <AlertModal
                isOpen={alertModal.isOpen}
                onClose={closeModal}
                title={alertModal.title}
                message={alertModal.message}
                type={alertModal.type}
                autoClose={alertModal.type === 'success' ? 3000 : undefined}
            />
            {renderStep()}
        </div>
    );
}