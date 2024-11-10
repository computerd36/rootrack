// src/components/UI/DropdownItem.tsx
import React from "react";

export interface IDropdownItemProps {
    onClick: () => void;
    children: React.ReactNode;
    className?: string;
}

export function DropdownItem({ onClick, children, className }: IDropdownItemProps) {
    return (
        <button
            onClick={() => {
                onClick();
                // Optionally, close the dropdown after selection
            }}
            className={`w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 ${className}`}
        >
            {children}
        </button>
    );
}