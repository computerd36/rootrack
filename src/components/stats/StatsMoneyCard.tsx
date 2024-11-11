import { Tooltip } from 'flowbite-react';
import * as React from 'react';
import ColorizedAmount from './ColorizedAmount';
import { StatsContainer } from './StatsContainer';

export interface IStatsMoneyCardProps {
    title: string;
    icon: React.ReactNode;
    value: number;
    description: string | React.ReactNode;
    isProfit?: boolean;
    type: 'money' | 'multiplier' | 'percentage';
    explanation?: string;
}

export function StatsMoneyCard(props: Readonly<IStatsMoneyCardProps>) {
    const { title, icon, value, description, isProfit, type, explanation } = props;

    // Determine the display value and suffix based on the type
    let displayValue: React.ReactNode;
    let suffix: string = '';

    switch (type) {
        case 'money':
            suffix = '$';
            displayValue = isProfit ? (
                <ColorizedAmount>{value.toFixed(2)}</ColorizedAmount>
            ) : (
                `$${value.toFixed(2)}`
            );
            break;
        case 'multiplier':
            suffix = 'x';
            displayValue = `${value.toFixed(2)}${suffix}`;
            break;
        case 'percentage':
            suffix = '%';
            displayValue = (value >= 100) ? (
                <span className='text-green-400'>{`${value.toFixed(2)}${suffix}`}</span>
            ) : (
                <span className='text-red-400'>{`${value.toFixed(2)}${suffix}`}</span>
            );
            break;
        default:
            displayValue = value;
    }

    return (
        <StatsContainer
            name={title}
            icon={icon}
        >
            <Tooltip content={explanation}>
                <h3 className='sm:text-5xl md:text-4xl xl:text-5xl 2xl:text-6xl text-indigo-100 font-bold'>
                    {displayValue}
                </h3>
            </Tooltip>
            <p className='text-indigo-200 text-sm mt-auto'>{description}</p>
        </StatsContainer>
    );
}
