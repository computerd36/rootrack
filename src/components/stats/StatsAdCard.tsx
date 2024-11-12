import { FaCheck, FaCopy, FaGift } from 'react-icons/fa';
import { StatsContainer } from './StatsContainer';
import { useState } from 'react';

export function StatsAdCard() {
    const [copied, setCopied] = useState(false);

    const copyToClipboard = () => {
        navigator.clipboard.writeText('cd36');
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
    }

    return (
        <StatsContainer
            name='Support and earn'
            icon={<FaGift />}
        >
            <p className='font-normal text-md xl:text-xl my-auto text-indigo-100'>
                Use code{' '}
                <span className='
                    font-bold 
                    text-yellow-400 
                    bg-gray-950 
                    py-1 
                    px-2 
                    rounded-xl 
                    inline-flex 
                    gap-2 
                    items-center 
                    justify-center 
                    w-min
                    cursor-pointer
                    select-none
                '
                    onClick={copyToClipboard}
                    title="Copy to clipboard"
                    aria-label='Copy bonus code to clipboard'
                >
                    cd36 {copied ? <FaCheck className="text-green-500" /> : <FaCopy />}
                </span>{' '}
                on Roobet to support this project or click{' '}
                <a
                    href='https://roobet.com/?ref=cd36'
                    target='_blank'
                    className='font-semibold text-yellow-400'
                    rel='noopener noreferrer'
                    aria-label='Support Rootrack on Roobet by using code cd36'
                >
                    here
                </a>.
            </p>
        </StatsContainer>
    );
}
