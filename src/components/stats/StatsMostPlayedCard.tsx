import { FaDice } from 'react-icons/fa';
import { StatsContainer } from './StatsContainer';

export interface IStatsMostPlayedCardProps {
    mostPlayedGames: { game: string, provider: string, count: number }[];
    mostPlayedCategories: { category: string, count: number }[];
    mostPlayedProviders: { provider: string, count: number }[];
}

export function StatsMostPlayedCard(props: IStatsMostPlayedCardProps) {
    return (
        <StatsContainer
            name='Most played'
            icon={<FaDice />}
        >
            <div className='grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-3 my-auto overflow-y-auto overflow-x-hidden'>
                <div className='min-w-0'>
                    <h3 className='text-xl md:text-3xl text-indigo-100 font-bold text-center mb-2'>Games</h3>
                    <ul className='text-indigo-200'>
                        {props.mostPlayedGames.map((game) => (
                            <li key={game.game} className='px-2 py-1 border-2 border-indigo-300 mb-2 md:mb-3 rounded-xl flex justify-between gap-2 text-sm md:text-xl'><span className='font-bold text-white text-nowrap text-ellipsis overflow-hidden'>{game.game.charAt(0).toUpperCase() + game.game.slice(1)}</span> <span className='text-nowrap shrink-0'>{game.count} bets</span></li>
                        ))}
                    </ul>
                </div>
                <div className='min-w-0'>
                    <h3 className='text-xl md:text-3xl text-indigo-100 font-bold text-center mb-2'>Categories</h3>
                    <ul className='text-indigo-200'>
                        {props.mostPlayedCategories.map((category) => (
                            <li key={category.category} className='px-2 py-1 border-2 border-indigo-300 mb-2 md:mb-3 rounded-xl flex justify-between gap-2 text-sm md:text-xl'><span className='font-bold text-white text-nowrap text-ellipsis overflow-hidden'>{category.category.charAt(0).toUpperCase() + category.category.slice(1)}</span> <span className='text-nowrap shrink-0'>{category.count} bets</span></li>
                        ))}
                    </ul>
                </div>
                <div className='min-w-0'>
                    <h3 className='text-xl md:text-3xl text-indigo-100 font-bold text-center mb-2'>Providers</h3>
                    <ul className='text-indigo-200'>
                        {props.mostPlayedProviders.map((provider) => (
                            <li key={provider.provider} className='px-2 py-1 border-2 border-indigo-300 mb-2 md:mb-3 rounded-xl flex justify-between gap-2 text-sm md:text-xl'><span className='font-bold text-white text-nowrap text-ellipsis overflow-hidden'>{provider.provider.charAt(0).toUpperCase() + provider.provider.slice(1)}</span> <span className='text-nowrap shrink-0'>{provider.count} bets</span></li>
                        ))}
                    </ul>
                </div>
            </div>
        </StatsContainer>
    );
}
