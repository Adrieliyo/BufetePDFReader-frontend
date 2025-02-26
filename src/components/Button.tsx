interface ButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
}

export function Button({ onClick, children, className = "" }: ButtonProps) {
  return (
    <button 
      onClick={onClick}
      className={`bg-blue-500 text-white px-4 py-2 rounded ${className}`}
    >
      {children}
    </button>
  );
}
  