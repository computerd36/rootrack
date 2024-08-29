import Spline from '@splinetool/react-spline';

interface DiceProps {
    setIsLoadingDice: (isLoading: boolean) => void;
}

export default function Dice(props: DiceProps) {
    return (
        <div className='w-full h-full'>
            <Spline scene="https://prod.spline.design/wNx6OomCZthbjBAE/scene.splinecode" onLoadCapture={(progress) => {console.log(progress)}} onLoad={() => props.setIsLoadingDice(false)}  />
        </div>
    );
}
