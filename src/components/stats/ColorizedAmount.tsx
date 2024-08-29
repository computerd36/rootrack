import React from 'react';

interface ColorizedAmountProps {
    children: number | string; // Expecting the amount as a number
    unit?: 'dollar' | 'percent'; // Optional prop to specify the unit
}

const ColorizedAmount: React.FC<ColorizedAmountProps> = ({ children, unit = 'dollar' }) => {
    children = typeof children === 'string' ? parseFloat(children) : children;

    const isNegative = children < 0;
    const formattedAmount = unit === 'dollar'
        ? `$${Math.abs(children).toFixed(2)}`
        : `${Math.abs(children).toFixed(2)}%`;

    const displayAmount = isNegative
        ? `-${formattedAmount}`
        : `+${formattedAmount}`;

    const color = isNegative ? 'text-red-400' : 'text-green-400';

    return (
        <span className={color}>
            {displayAmount}
        </span>
    );
};

export default ColorizedAmount;
