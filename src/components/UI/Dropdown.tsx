// src/components/UI/Dropdown.tsx
import React, { useState, useRef, useEffect } from "react";
import { Button, IButtonProps } from "./Button";

export interface IDropdownProps {
    label: string;
    children: React.ReactNode;
    className?: string;
    buttonProps?: Partial<IButtonProps>;
    inverted?: boolean;
}

export function Dropdown({ label, children, className, buttonProps, inverted }: IDropdownProps) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const toggleDropdown = () => setIsOpen(!isOpen);

    const handleClickOutside = (event: MouseEvent) => {
        if (
            dropdownRef.current &&
            !dropdownRef.current.contains(event.target as Node)
        ) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const dropdownMenuClasses = `absolute mt-2 w-full rounded-md shadow-lg bg-white text-gray-700'
        } ring-1 ring-black ring-opacity-5 z-10`;

    return (
        <div className={`relative inline-block text-left ${className}`} ref={dropdownRef}>
            <Button
                onClick={toggleDropdown}
                ariaLabel={`${label} dropdown`}
                inverted={inverted} // Pass the inverted prop to the Button
                {...buttonProps}
            >
                {label}
                <svg
                    className="w-4 h-4 ml-2"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </Button>

            {isOpen && (
                <div className={dropdownMenuClasses}>
                    <div className="py-1">
                        {children}
                    </div>
                </div>
            )}
        </div>
    );
}
