// react
import { useEffect, useState } from 'react';

// firebase
import { getCounter } from '../../firebase/counter';

// modules
import CountUp from 'react-countup';
import { motion } from 'framer-motion';


interface StatsCounterProps {
    loaded: boolean;
    setLoaded: (loaded: boolean) => void;
}

export function StatsCounter({ loaded, setLoaded }: StatsCounterProps) {
    const [counter, setCounter] = useState(0);

    const [showTimer, setShowTimer] = useState(false);

    // Get the counter value from the database
    useEffect(() => {
        getCounter().then((count) => {
            setCounter(count);
            setLoaded(true);
        });
    }, [setLoaded]);

    // Function to shorten the number
    function shortNumber(n: number): { number: number, suffix: string } {
        if (n < 1000) return { number: n, suffix: '' };

        if (n < 1000000) return { number: Math.round(n / 1000), suffix: 'K' };

        if (n < 1000000000) return { number: Math.round(n / 1000000), suffix: 'M' };

        return { number: Math.round(n / 1000000000), suffix: 'B' };
    }

    useEffect(() => {
        if(loaded) {
            setTimeout(() => {
                setShowTimer(true);
            }, 3500);
        }
    }, [loaded]);



    return (
        <motion.div
            initial={{ scale: 0, opacity: 0}}
            animate={loaded ? { scale: 1, opacity: 1 } : {}}
            transition={{ delay: 3.8, duration: 1, ease: 'easeInOut', type: "spring", stiffness: 120 }}
            className='md:mr-12 my-auto px-6'
        >
            <div className='text-yellow-300 font-bold 2xl:text-8xl xl:text-7xl text-6xl '>
                {/* the counter that shows */}
                <span className='absolute'>
                    {showTimer && <CountUp duration={3} end={shortNumber(counter).number} />}
                    {shortNumber(counter).suffix}
                </span>

                <span className='invisible'>
                    {shortNumber(counter).number + shortNumber(counter).suffix}
                </span>


            </div>
            <span className='text-yellow-300 flex flex-col'>
                <span className='2xl:text-5xl xl:text-3xl text-2xl '>
                    insights
                </span>
                <span className='2xl:text-5xl xl:text-3xl text-2xl '>
                    created
                </span>
            </span>
        </motion.div >
    );
}