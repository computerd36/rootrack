import { motion } from "framer-motion";


interface LandingPageChartProps {
    loaded: boolean;
}

export const LandingPageChart = ({ loaded }: LandingPageChartProps) => {
    const pathAnimation = {
        hidden: { pathLength: 0 },
        visible: {
            pathLength: 1,
            transition: {
                duration: 2.5,
                ease: 'easeOut',
            },
            
        },
    };


    return (
        <svg
            viewBox="0 0 808 378"
            preserveAspectRatio="xMidYMid meet"
            style={{ width: '100%', height: 'auto' }}
        >
            <motion.path
                d="M1,343C42.1478,343 72.8687,314.701 114.584,312.984C141.312,311.884 168.418,324.588 191.902,333.451C273.444,364.225 269.692,282.625 330.214,282.625C366.212,282.625 390.428,307.574 431.007,307.574C553.605,307.574 505.679,24.5 596,24.5C672.577,24.5002 653.538,215.763 717.679,215.763C758.912,215.763 753.022,189.317 808,189.317"
                variants={pathAnimation}
                initial="hidden"
                animate={loaded ? 'visible' : 'hidden'}
                stroke="#FACC15"
                strokeWidth="2"
                fill="none"


            />
        </svg>
    );
} 