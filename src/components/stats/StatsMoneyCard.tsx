import { Card } from 'flowbite-react';
import * as React from 'react';
import ColorizedAmount from './ColorizedAmount';

export interface IStatsMoneyCardProps {
    title: string;
    icon: React.ReactNode;
    value: number;
    description: string | React.ReactNode;
    isProfit?: boolean;
    isMultiplier?: boolean;
}

export function StatsMoneyCard(props: IStatsMoneyCardProps) {

    if (!props.isMultiplier) {

        return (
            <Card className="bg-indigo-900 grow h-full">
                <div className='flex flex-col gap-4 justify-start h-full'>
                    <p className='flex items-center gap-2 text-indigo-300'>{props.icon} {props.title}</p>
                    {props.isProfit ? <h3 className='sm:text-xl md:text-3xl 2xl:text-5xl text-indigo-100 font-bold'><ColorizedAmount>{props.value.toFixed(2)}</ColorizedAmount></h3> :
                        <h3 className='sm:text-xl md:text-3xl 2xl:text-5xl text-indigo-100 font-bold'>${props.value.toFixed(2)}</h3>}
                    <p className='text-indigo-200'>{props.description}</p>
                </div>
            </Card>
        );
    } else {
        return (
            <Card className="bg-indigo-900 grow h-full">
                <div className='flex flex-col gap-4 justify-start h-full'>
                    <p className='flex items-center gap-2 text-indigo-300'>{props.icon} {props.title}</p>
                    <h3 className='sm:text-xl md:text-3xl 2xl:text-5xl text-indigo-100 font-bold'>{props.value.toFixed(2)}x</h3>
                    <p className='text-indigo-200'>{props.description}</p>
                </div>
            </Card>
        );
    }
}
