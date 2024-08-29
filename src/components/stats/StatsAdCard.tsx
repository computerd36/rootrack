import { Card } from 'flowbite-react';

export function StatsAdCard() {
    return (
        <Card className="bg-indigo-900 w-full hover:bg-indigo-800" href='https://roobet.com/?ref=cd36'>
            <h1 className='md:text-xl sm:text-sm text-white font-semibold leading-loose'>USE PROMO CODE <span className='font-bold text-yellow-400 underline'>cd36</span> ON ROOBET TO SUPPORT THE DEVELOPMENT OF THIS PROJECT</h1>
            {/* <Button href="https://roobet.com/?ref=cd36" target='blank' color={"warning"}>Open Roobet</Button> */}
        </Card>
    );
}