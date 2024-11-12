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
    inverted?: boolean;
}

export function Button({ children, icon, size, onClick, linkTo, disabled, ariaLabel, isFullWidth, className, inverted }: IButtonProps) {

    const baseClasses = `rounded-xl px-4 py-2 flex items-center justify-center gap-2 text-nowrap transition-all ${isFullWidth ? 'w-full' : ''
        } ${className}`;

    const regularClasses = `text-yellow-400 outline outline-2 hover:outline-4 outline-yellow-400 hover:outline-yellow-300 hover:text-yellow-300`;
    const invertedClasses = `bg-yellow-300 text-slate-950 outline outline-2 hover:outline-4 outline-yellow-300 hover:bg-slate-950 hover:outline-yellow-300 hover:text-yellow-300 transition-4`;

    const sizeClass = `text-${size ? size : 'md'}`;
    const classes = `${baseClasses} ${inverted ? invertedClasses : regularClasses} ${sizeClass}`;

    if (disabled) {
        return (
            <button
                className={`${baseClasses} text-yellow-400 border-2 border-yellow-400/70 hover:border-yellow-400/70 opacity-50 cursor-not-allowed ${sizeClass}`}
                aria-label={ariaLabel}
                disabled
            >
                {icon} {children}
            </button>
        );
    }

    if (linkTo) {
        return (
            <Link
                to={linkTo}
                className={classes}
                aria-label={ariaLabel}
                {...(linkTo.startsWith('http') && { target: '_blank', rel: 'noreferrer noopener' })}
            >
                {icon} {children}
            </Link>
        );
    } else {
        return (
            <button onClick={onClick} className={classes} aria-label={ariaLabel}>
                {icon} {children}
            </button>
        );
    }
}
