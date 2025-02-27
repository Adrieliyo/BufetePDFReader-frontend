interface SecondaryButtonProps {
    onClick?: () => void;
    children: React.ReactNode;
    className?: string;
  }
  
  export function SecondaryButton({ onClick, children, className = "" }: SecondaryButtonProps) {
    return (
      <button 
        onClick={onClick}
        className={`px-4 py-2 font-medium text-gray-700 bg-white border-2 border-gray-300 rounded-lg hover:text-gray-500 hover:bg-gray-50 transition-colors duration-300 ${className}`}
      >
        {children}
      </button>
    );
  }
    