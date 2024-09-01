import { Card } from 'flowbite-react';
import { FaGift } from 'react-icons/fa';

export function StatsAdCard() {
    const handleClick = () => {
        window.open('https://roobet.com/?ref=cd36', '_blank');
    }

    return (
        <Card className="bg-indigo-900 w-full hover:bg-indigo-800 cursor-pointer" onClick={handleClick}>
            <h2 className='mb-0 text-2xl font-bold tracking-tight text-indigo-300 flex items-center gap-2'><FaGift /> Support and earn</h2>
            <p className='font-normal text-indigo-100'> Click here to use our bonus code on Roobet to support the development of the project.</p>
        </Card>
    );
}
