// react
import { useState } from 'react';

// UI, icons and components
import Header from '../components/Header';
import { StatsCounter } from '../components/stats/StatsCounter';

// modules
import { motion } from 'framer-motion';

// assets
import RootrackScreenshot from '../assets/rootrack-sc.png';


export function PageStart() {

    // loaded state for the counter 
    const [loaded, setLoaded] = useState(false);

    return (
        <div className='h-dvh flex flex-col bg-slate-950'>
            <Header />

            {/* Main content */}
            <div className='flex w-full grow overflow-hidden'>

                {/* Left side */}
                <div className='z-10 md:w-1/2 sm:w-full px-6 md:pl-12 md:pr-0 min-w-24 text-left flex flex-col justify-center gap-2'>
                    <h1 className='text-yellow-300 2xl:text-9xl xl:text-8xl md:text-7xl text-7xl md:text-left text-center font-semibold text-balance w-auto'>Track Your Betting Journey with Ease</h1>
                    <h2 className='text-yellow-400 xl:text-2xl md:text-xl text-xl md:text-left text-center'>The ultimate tool for tracking your profits, losses, and trends on Roobet. Gain valuable insights with a wide array of statistics and charts. User-friendly and completely free to use.</h2>
                </div>

                {/* Right side */}
                <div className='h-full flex flex-col items-start md:w-1/2 w-0 py-5 translate-x-1/4 translate-y-1/4'>
                    <div className='mb-2'>
                        <StatsCounter setLoaded={setLoaded} />
                    </div>
                    <motion.div
                        initial={{ y: 200, opacity: 0 }} // Start off-screen to the right
                        animate={loaded ? { y: 0, opacity: 1 } : {}}   // Animate to the final position
                        transition={{ duration: 1, ease: 'easeOut', type: 'spring' }} // Customize duration and easing
                    >
                        <img src={RootrackScreenshot} alt="Rootrack Screenshot" className='opacity-[25%] hover:opacity-[50%] transition-all duration-500 pointer-events-none' />
                    </motion.div>
                </div>
            </div>
        </div>
    );
}