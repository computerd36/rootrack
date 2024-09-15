import { Card } from 'flowbite-react';
import { FaDice } from 'react-icons/fa';

export interface IStatsMostPlayedCardProps {
    mostPlayedGames: { game: string, count: number }[];
    mostPlayedCategories: { category: string, count: number }[];
    mostPlayedProviders: { provider: string, count: number }[];
}

export function StatsMostPlayedCard(props: IStatsMostPlayedCardProps) {
    return (
        <Card className="bg-indigo-900 w-full">
            <p className='flex items-center gap-2 text-indigo-300'><FaDice /> Most bets</p>
            <div className='grid grid-cols-1 gap-2 md:grid-cols-3 md:gap-4 xl:gap-8'>
                <div>
                    <h3 className='text-xl text-indigo-100 font-bold text-center'>Games</h3>
                    <ul className='text-indigo-200'>
                        {props.mostPlayedGames.map((game) => (
                            <li key={game.game} className='px-2 py-1 border border-indigo-300 mb-1 rounded-xl flex justify-between gap-2'><span className='font-bold text-white text-nowrap text-ellipsis overflow-hidden'>{game.game}</span> <span className='text-nowrap'>{game.count} bets</span></li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h3 className='text-xl text-indigo-100 font-bold text-center'>Categories</h3>
                    <ul className='text-indigo-200'>
                        {props.mostPlayedCategories.map((category) => (
                            <li key={category.category} className='px-2 py-1 border border-indigo-300 mb-1 rounded-xl flex justify-between gap-2 text-ellipsis'><span className='font-bold text-white text-nowrap text-ellipsis overflow-hidden'>{category.category.charAt(0).toUpperCase() + category.category.slice(1)}</span> <span className='text-nowrap'>{category.count} bets</span></li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h3 className='text-xl text-indigo-100 font-bold text-center'>Providers</h3>
                    <ul className='text-indigo-200'>
                        {props.mostPlayedProviders.map((provider) => (
                            <li key={provider.provider} className='px-2 py-1 border border-indigo-300 mb-1 rounded-xl flex justify-between gap-2 text-ellipsis'><span className='font-bold text-white text-nowrap text-ellipsis overflow-hidden'>{provider.provider.charAt(0).toUpperCase() + provider.provider.slice(1)}</span> <span className='text-nowrap'>{provider.count} bets</span></li>
                        ))}
                    </ul>
                </div>
            </div>
        </Card>
    );
}
