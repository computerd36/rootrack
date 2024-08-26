import { Button } from 'flowbite-react';
import { HiOutlineArrowRight } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';

export function PageStart() {
    const navigate = useNavigate();

    return (
        <div className='w-full h-full bg-slate-950 flex items-center justify-center'>
            <div>
                <h1 className='text-yellow-300 text-4xl'>Welcome to Roostats</h1>
                <p className='text-white mb-3'>This is a simple dashboard for tracking deposits and withdraws.</p>
                <div className='flex gap-3 justify-end'>
                    <Button
                        color="warning"
                        onClick={() => {
                            navigate('/form')
                        }}
                    >
                        Start process
                        <HiOutlineArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                </div>
            </div>

        </div>
    );
}
