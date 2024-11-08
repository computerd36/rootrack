// react
import { useEffect, useState } from 'react';

// firebase
import { getCounter } from '../../firebase/counter';

// modules
import CountUp from 'react-countup';
import { motion } from 'framer-motion';


interface StatsCounterProps {
    setLoaded: (loaded: boolean) => void;
}

export function StatsCounter({ setLoaded }: StatsCounterProps) {
    const [counter, setCounter] = useState(0);

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

    return (
        <motion.div
            initial={{ x: 300, opacity: 0 }} // Start off-screen to the right
            animate={(counter > 0) ? { x: 0, opacity: 1 } : {}}   // Animate to the final position
            transition={{ duration: 1, ease: 'easeOut', type: 'spring' }} // Customize duration and easing+
        >
            <span className='text-yellow-300 font-bold 2xl:text-7xl xl:text-5xl text-3xl '>
                {/* the counter that shows */}
                <span className='absolute '>
                    <CountUp end={shortNumber(counter).number} separator=' ' duration={2.75} />
                    {shortNumber(counter).suffix}
                </span>

                {/* just a spacer in the width of the counter so the text doesnt move */}
                <span className='invisible'>
                    {shortNumber(counter).number + shortNumber(counter).suffix}
                </span>
            </span>
            <span className='text-yellow-300/20 2xl:text-5xl xl:text-4xl text-2xl '>
                &nbsp;
                insights generated
            </span>
        </motion.div >
    );
}