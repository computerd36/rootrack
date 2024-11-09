import { FaGift } from 'react-icons/fa';
import { StatsContainer } from './StatsContainer';

export function StatsAdCard() {

    return (
        <StatsContainer
            name='Support and earn'
            icon={<FaGift />}
        >
            <p className='font-normal text-xl my-auto text-indigo-100'> Use bonus code <span className='font-bold text-yellow-400' >cd36</span> on Roobet to support the development of this project or click <a href='https://roobet.com/?ref=cd36' target='_blank' className='font-semibold text-yellow-400'>here</a>.</p>

        </StatsContainer>
    );
}
