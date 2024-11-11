// react

// UI, icons and components
import { useState } from 'react';
import Header from '../components/Header';
import { StatsCounter } from '../components/stats/StatsCounter';

// modules

// assets
import { LandingPageChart } from '../components/stats/charts/LandingPageChart';
import { Button } from '../components/UI/Button';
import { FaPlus } from 'react-icons/fa';


export function PageStart() {
    const [loaded, setLoaded] = useState(false);

    return (
        <div className='h-dvh flex flex-col bg-slate-950'>
            <Header />

            {/* Main content */}
            <div className='grid w-full max-w-[2560px] h-full overflow-hidden relative mx-auto'>

                <div className='col-start-1 row-start-1 z-10 xl:mx-0 xl:w-1/2 md:h-2/3 md:w-1/2 sm:w-full px-6 md:pl-12 md:pr-0 text-left flex flex-col justify-center gap-2 '>
                    <h1 className='text-yellow-300 2xl:text-8xl xl:text-6xl md:text-6xl text-7xl md:text-left text-center font-semibold text-pretty'>Track Your Betting Journey with Ease</h1>
                    <h2 className='text-yellow-300 2xl:text-4xl xl:text-2xl md:text-xl text-xl md:text-left text-center'>The ultimate tool for tracking your profits, losses, and trends on Roobet. Gain valuable insights with a wide array of statistics and charts. User-friendly and completely free to use.</h2>
                    <div className='flex gap-4 mt-2'>
                        <Button
                            icon={<FaPlus />}
                            size='xl'
                            ariaLabel='Create new insight'
                            linkTo='/form'
                            className='min-w-1/3 max-w-96'
                            inverted
                        >Create Your Roobet Insights</Button>
                    </div>
                </div>


                <div className='col-start-1 row-start-1 z-0 top-0 left-0 w-full h-min mt-auto flex items-end md:visible invisible' >
                    <LandingPageChart loaded={loaded} />
                    <StatsCounter loaded={loaded} setLoaded={setLoaded} />
                </div>
            </div>
        </div >
    );
}