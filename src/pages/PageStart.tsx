import { Button } from 'flowbite-react';
import { HiOutlineArrowRight } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

import RootrackScreenshot from '/rootrack_blurred.png';

export function PageStart() {
    const navigate = useNavigate();

    return (
        <div className='h-dvh flex flex-col bg-slate-950'>
            <Header />

            {/* Grid container to hold both the text and the Dice */}
            <div className='flex w-full grow overflow-hidden'>
                {/* Text content positioned in the center and over Dice */}
                <div className='z-10 xl:w-1/3 md:w-1/2 sm:w-full px-6 md:pl-12 md:pr-0 min-w-24 text-left flex flex-col justify-center gap-2 to-indigo-750'>
                    <h1 className='text-yellow-300 text-5xl font-semibold'>Track Your Betting Journey with Ease</h1>
                    <h1 className='text-yellow-300 text-xl'>Stay in Control of Your Betting Activity</h1>
                    <p className='text-white mb-3'>The ultimate tool for tracking your profits, losses, and trends on Roobet. Gain valuable insights with a wide array of statistics and charts. User-friendly and completely free to use.</p>
                    <div className='flex gap-3 justify-end'>
                        <Button
                            color="warning"
                            onClick={() => {
                                navigate('/form')
                            }}
                            className='text-white font-black'
                        >
                            Start
                            <HiOutlineArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                    </div>
                </div>
                <div className='h-full flex items-center justify-center xl:w-2/3 md:w-1/2 w-0 py-5'>
                    <img src={RootrackScreenshot} alt="Rootrack Screenshot" className='h-full object-contain' />
                </div>
            </div>
        </div>
    );
}