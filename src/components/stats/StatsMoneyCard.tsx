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
    isMultiplier?: boolean;
    explanation?: string;
}

export function StatsMoneyCard(props: Readonly<IStatsMoneyCardProps>) {

    if (!props.isMultiplier) {
        return (
            <StatsContainer
                name={props.title}
                icon={props.icon}
            >
                <Tooltip content={props.explanation}>
                    {props.isProfit ? <h3 className='sm:text-5xl md:text-4xl xl:text-5xl 2xl:text-6xl text-indigo-100 font-bold'><ColorizedAmount>{props.value.toFixed(2)}</ColorizedAmount></h3> :
                        <h3 className='sm:text-5xl md:text-4xl xl:text-5xl 2xl:text-6xl text-indigo-100 font-bold'>${props.value.toFixed(2)}</h3>}
                </Tooltip>
                <p className='text-indigo-200 text-sm mt-auto'>{props.description}</p>
            </StatsContainer>
        );
    } else {
        return (
            <StatsContainer
                name={props.title}
                icon={props.icon}
            >
                <Tooltip content={props.explanation}>
                    <h3 className='sm:text-xl md:text-3xl 2xl:text-5xl text-indigo-100 font-bold'>{props.value.toFixed(2)}x</h3>
                </Tooltip>
                <p className='text-indigo-200 text-sm mt-auto'>{props.description}</p>
            </StatsContainer>
        );
    }
}
