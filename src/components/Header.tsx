import { Button } from 'flowbite-react';

export function Header() {
    return (
        <div className='w-full h-20 bg-indigo-950 flex items-center justify-between px-3'>
            <h1 className='text-yellow-300 text-2xl'>ROOSTATS</h1>
            <Button>Click me</Button>
        </div>
    );
}
