import React from 'react';

export interface IStatsContainerProps {
    name: string;
    icon: React.ReactNode;
    children?: React.ReactNode;
}

export function StatsContainer({ name, icon, children }: IStatsContainerProps) {
    return (
        <div className="flex w-full h-full justify-start flex-col p-6 bg-indigo-900 rounded-xl border-4 border-yellow-400/80 select-none">
            <h2 className='flex items-center mb-4 gap-2 text-indigo-300'>{icon} {name}</h2>
            {children}
        </div>
    );
}
