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
            <p className='flex items-center gap-2 text-indigo-300'><FaDice /> Most played</p>
            <div className='flex justify-between'>
                <div>
                    <h3 className='text-xl text-indigo-100 font-bold underline'>Games</h3>
                    <ul className='text-indigo-200'>
                        {props.mostPlayedGames.map((game) => (
                            <li key={game.game}><span className='font-bold'>{game.game}</span> ({game.count} bets)</li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h3 className='text-xl text-indigo-100 font-bold underline'>Categories</h3>
                    <ul className='text-indigo-200'>
                        {props.mostPlayedCategories.map((category) => (
                            <li key={category.category}><span className='font-bold'>{category.category.charAt(0).toUpperCase() + category.category.slice(1)}</span> ({category.count} bets)</li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h3 className='text-xl text-indigo-100 font-bold underline'>Providers</h3>
                    <ul className='text-indigo-200'>
                        {props.mostPlayedProviders.map((provider) => (
                            <li key={provider.provider}><span className='font-bold'>{provider.provider.charAt(0).toUpperCase() + provider.provider.slice(1)}</span> ({provider.count} bets)</li>
                        ))}
                    </ul>
                </div>
            </div>
        </Card>
    );
}
