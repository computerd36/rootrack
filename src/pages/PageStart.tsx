import { Button } from 'flowbite-react';
import { HiOutlineArrowRight } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

export function PageStart() {
    const navigate = useNavigate();

    return (
        <div className='h-dvh flex flex-col'>
            <Header />
            <div className='w-full grow bg-slate-950 flex items-center justify-center'>
                <div className='w-2/3 mx-5 min-w-24'>
                    <h1 className='text-yellow-300 text-6xl'>Stay in Control of Your Betting Activity</h1>
                    <p className='text-white mb-3'>The ultimate tool for tracking your profits, losses, and trends. Gain valuable insights with a wide array of statistics and charts. User-friendly and completely free to use.</p>
                    <div className='flex gap-3 justify-end'>
                        <Button
                            color="warning"
                            onClick={() => {
                                navigate('/form')
                            }}
                            className='text-slate-950'
                        >
                            Start process
                            <HiOutlineArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
