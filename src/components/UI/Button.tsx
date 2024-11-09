import React from "react";


export interface IButtonProps {
    text: string;
    icon?: React.ReactNode;
    size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl' | '8xl' | '9xl';
    onClick: () => void;
    ariaLabel: string;

}

export function Button({ text, icon, size, onClick, ariaLabel }: IButtonProps) {
    return (
        <button onClick={onClick} className={`text-yellow-400 border-2 border-yellow-400 rounded-xl px-4 py-2 flex items-center justify-center gap-2 text-nowrap text-${size ? size : 'md'}`} aria-label={ariaLabel}>
            {icon} {text} 
        </button>
    );
}