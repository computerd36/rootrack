import React from "react";
import { Link } from "react-router-dom";


export interface IButtonProps {
    children?: React.ReactNode;
    icon?: React.ReactNode;
    size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl' | '8xl' | '9xl';
    onClick?: () => void;
    linkTo?: string;
    ariaLabel: string;

}

export function Button({ children, icon, size, onClick, linkTo, ariaLabel }: IButtonProps) {
    if (linkTo) {
        return (
            <Link to={linkTo} className={`text-yellow-400 border-2 border-yellow-400 hover:border-yellow-400/70 hover:text-yellow-400/70 rounded-xl px-4 py-2 flex items-center justify-center gap-2 text-nowrap text-${size ? size : 'md'} transition-all`} aria-label={ariaLabel}>
                {icon} {children}
            </Link>
        );
    } else {
        return (
            <button onClick={onClick} className={`text-yellow-400 border-2 border-yellow-400 hover:border-yellow-400/70 hover:text-yellow-400/70 rounded-xl px-4 py-2 flex items-center justify-center gap-2 text-nowrap text-${size ? size : 'md'} transition-all`} aria-label={ariaLabel}>
                {icon} {children}
            </button>
        );
    }
}