// react
import { useState } from 'react';

// UI, icons and components
import { HiOutlineArrowRight } from 'react-icons/hi';
import Header from '../components/Header';
import { StatsCounter } from '../components/stats/StatsCounter';

// modules
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

// assets
import RootrackScreenshot from '../assets/rootrack-sc.webp';

export function PageStart() {

    // loaded state for the counter 
    const [loaded, setLoaded] = useState(false);

    return (
        <div className='h-dvh flex flex-col bg-slate-950'>
            <Header />

            {/* Main content */}
            <div className='flex w-full grow overflow-hidden'>

                {/* Left side */}
                <div className='z-10 md:w-1/2 sm:w-full px-6 md:pl-12 md:pr-0 min-w-24 text-left flex flex-col justify-center gap-2 to-indigo-750'>
                    <h1 className='text-yellow-300 2xl:text-8xl xl:text-7xl md:text-5xl text-6xl font-semibold'>Track Your Betting Journey with Ease</h1>
                    <h2 className='text-yellow-300/90 xl:text-2xl md:text-xl text-xl'>The ultimate tool for tracking your profits, losses, and trends on Roobet. Gain valuable insights with a wide array of statistics and charts. User-friendly and completely free to use.</h2>
                    <div className='flex gap-3 justify-end'>
                        <Link
                            to="/form"
                            className="text-yellow-300 bg-indigo-950 font-2xl font-semibold px-6 py-2 rounded-xl inline-flex items-center border-2 border-yellow-300"
                        >
                            Create Insights
                            <HiOutlineArrowRight className="ml-2 h-6 w-6" />
                        </Link>
                    </div>
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