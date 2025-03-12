import React from 'react';

interface BreadcrumbItem {
    icon?: React.ReactNode;
    label: string;
    onClick?: () => void;
}

interface BreadcrumbProps {
    items: BreadcrumbItem[];
    className?: string;
}

export function Breadcrumb({ items, className = '' }: BreadcrumbProps) {
    return (
        <nav className={`flex items-center text-gray-600 ${className}`} aria-label="Breadcrumb">
            <ol className="flex items-center flex-wrap">
                {items.map((item, index) => (
                    <React.Fragment key={index}>
                        {index > 0 && (
                            <li className="flex items-center mx-2">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"
                                    className="w-7 h-7 text-gray-500 fill-current" fill="currentColor">
                                    <path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z" />
                                </svg>
                            </li>
                        )}
                        <li>
                            <div
                                className={`flex items-center ${item.onClick ? 'cursor-pointer hover:text-gray-900' : ''}`}
                                onClick={item.onClick}
                            >
                                {item.icon && (
                                    <div className="mr-2 text-gray-500 w-5 h-5">
                                        {item.icon}
                                    </div>
                                )}
                                <span>{item.label}</span>
                            </div>
                        </li>
                    </React.Fragment>
                ))}
            </ol>
        </nav>
    );
}