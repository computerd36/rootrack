import React from "react";
import { Link } from "react-router-dom";


export interface IButtonProps {
    ariaLabel: string;
    children?: React.ReactNode;
    icon?: React.ReactNode;
    size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl' | '8xl' | '9xl';
    onClick?: () => void;
    linkTo?: string;
    disabled?: boolean;
    isFullWidth?: boolean;
    className?: string;
}

export function Button({ children, icon, size, onClick, linkTo, disabled, ariaLabel, isFullWidth, className }: IButtonProps) {

    if (disabled) {
        return (
            <button className={`text-yellow-400 border-2 border-yellow-400/70 hover:border-yellow-400/70 rounded-xl px-4 py-2 flex items-center justify-center gap-2 text-nowrap text-${size ? size : 'md'} transition-all opacity-50 cursor-not-allowed ${isFullWidth && 'w-full'} ${className}`} aria-label={ariaLabel}>
                {icon} {children}
            </button>
        );
    }

    if (linkTo) {
        return (
            <Link to={linkTo} className={`text-yellow-400 outline outline-2 hover:outline-4 outline-yellow-400 hover:outline-yellow-300 hover:text-yellow-300 rounded-xl px-4 py-2 flex items-center justify-center gap-2 text-nowrap text-${size ? size : 'md'} transition-all ${isFullWidth && 'w-full'} ${className}`} aria-label={ariaLabel} target="_blank">
                {icon} {children}
            </Link>
        );
    } else {
        return (
            <button onClick={onClick} className={`text-yellow-400 outline outline-2 hover:outline-4 outline-yellow-400 hover:outline-yellow-300 hover:text-yellow-300 rounded-xl px-4 py-2 flex items-center justify-center gap-2 text-nowrap text-${size ? size : 'md'} transition-all ${isFullWidth && 'w-full'} ${className}`} aria-label={ariaLabel}>
                {icon} {children}
            </button>
        );
    }
}