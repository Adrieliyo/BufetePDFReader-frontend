import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Step1EmailInput } from './steps/Step1EmailInput';
import { Step2CodeVerification } from './steps/Step2CodeVerification';
import { Step3NewPassword } from './steps/Step3NewPassword';
import { Step4VerificationPage } from './steps/Step4VerificationPage';

export function RecoverPasswordPage() {
    const [step, setStep] = useState(1);
    const navigate = useNavigate();

    const handleNext = () => {
        if (step < 4) {
            setStep(step + 1);
        }
    };

    const handleBack = () => {
        if (step > 1) {
            setStep(step - 1);
        } else {
            navigate('/auth/login');
        }
    };

    const renderStep = () => {
        switch (step) {
            case 1:
                return <Step1EmailInput onNext={handleNext} onBack={handleBack} />;
            case 2:
                return <Step2CodeVerification onNext={handleNext} onBack={handleBack} />;
            case 3:
                return <Step3NewPassword onNext={handleNext} onBack={handleBack} />;
            case 4:
                return <Step4VerificationPage onComplete={() => navigate('/auth/login')} />;
        }
    };

    return (
        <div className="w-full h-full">
            {renderStep()}
        </div>
    );
}