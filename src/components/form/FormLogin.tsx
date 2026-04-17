import { useState } from 'react';
import { Button } from '../UI/Button';
import { FaInfoCircle, FaSignInAlt } from 'react-icons/fa';
import { StatsFoundModal } from '../modals/StatsFoundModal';
import { ApiChangeModal } from '../modals/ApiChangeModal';

export function FormLogin() {
    const [apiModalDismissed, setApiModalDismissed] = useState(false);

    return (
        <>
            <ApiChangeModal onClose={() => setApiModalDismissed(true)} />
            {apiModalDismissed && <StatsFoundModal />}
            <div className='flex flex-col justify-center h-full'>
                <h2 className='text-white text-2xl text-left font-bold '>Log in on Roobet</h2>
                <h3 className='text-indigo-300 text-sm text-left mt-2 flex items-start gap-1'>
                    <FaInfoCircle className='shrink-0 mt-0.5' />If you are already logged in, you can skip this step.
                </h3>
                <div className='flex gap-2 my-6'>
                    <Button
                        linkTo={"https://roobet.com/?modal=auth&tab=login"}
                        ariaLabel='Login on Roobet'
                        isFullWidth
                        inverted

                    >
                        <div className='flex items-center justify-center gap-2'>
                            <FaSignInAlt /> Login on Roobet
                        </div>
                    </Button>
                </div>
            </div>
        </>
    );
}
