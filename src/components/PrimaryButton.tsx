interface PrimaryButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  type: string;
}

export function PrimaryButton({ onClick, children, className = "" }: PrimaryButtonProps) {
  return (
    <button 
      onClick={onClick}
      className={`px-4 py-2 text-white bg-blue-900 rounded-lg hover:bg-blue-800 focus:outline-none transition-colors duration-300 ${className}`}
    >
      {children}
    </button>
  );
}
  