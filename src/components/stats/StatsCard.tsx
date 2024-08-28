import { Card } from 'flowbite-react';
import * as React from 'react';

export interface IStatsCardProps {
    title: string;
    icon: React.ReactNode;
    value: number;
    description: string;
}

export function StatsCard(props: IStatsCardProps) {
    return (
        <Card className="bg-indigo-900 w-80">
            <p className='flex items-center gap-1 text-indigo-300'>{props.icon} {props.title}</p>
            <h3 className='text-5xl text-indigo-100 font-bold'>{props.value.toFixed(2)} $</h3>
            <p className='text-indigo-200'>{props.description}</p>
        </Card>
    );
}
