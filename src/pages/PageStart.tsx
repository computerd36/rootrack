import { Button } from 'flowbite-react';
import { HiOutlineArrowRight } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Dice from '../components/Dice';

export function PageStart() {
    const navigate = useNavigate();

    return (
        <div className='h-dvh flex flex-col bg-slate-950'>
            <Header />

            {/* Grid container to hold both the text and the Dice */}
            <div className='flex w-full grow overflow-hidden'>
                {/* Text content positioned in the center and over Dice */}
                <div className='z-10 lg:w-1/3 md:w-1/2 px-10 min-w-24 text-left flex flex-col justify-center gap-2 bg-indigo-950'>
                    <h1 className='text-yellow-300 text-6xl'>View Every Angle of the Dice</h1>
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
                            Start process
                            <HiOutlineArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                    </div>
                </div>
                <div className='lg:w-2/3 h-full md:w-1/2'>
                    <Dice />
                </div>
            </div>
        </div>
    );
}