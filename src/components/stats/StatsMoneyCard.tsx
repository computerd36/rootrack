import { Card } from 'flowbite-react';
import * as React from 'react';

export interface IStatsMoneyCardProps {
    title: string;
    icon: React.ReactNode;
    value: number;
    description: string;
}

export function StatsMoneyCard(props: IStatsMoneyCardProps) {
    return (
        <Card className="bg-indigo-900 grow">
            <p className='flex items-center gap-2 text-indigo-300'>{props.icon} {props.title}</p>
            <h3 className='sm:text-xl md:text-3xl 2xl:text-5xl text-indigo-100 font-bold'>{props.value.toFixed(2)} $</h3>
            <p className='text-indigo-200'>{props.description}</p>
        </Card>
    );
}
