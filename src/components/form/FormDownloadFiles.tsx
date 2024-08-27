import { Button } from 'flowbite-react';
import React from 'react';

export function FormDownloadFiles() {
    return (
        <React.Fragment>
            <div className='flex flex-col justify-center h-full'>
                <h2 className='text-white text-2xl text-center font-bold mb-5'> Download your deposits and withdraws from Roobet</h2>
                <div className='flex gap-2 my-5'>
                    <Button className='w-1/2' color={"light"} href="https://roobet.com/_api/history/withdrawals?type=&order=desc&limit=1000000" target='_blank'>Download withdraws here</Button>
                    <Button className='w-1/2' color={"light"} href='https://roobet.com/_api/history/deposits?type=&order=desc&limit=1000000' target='_blank'>Download deposits here</Button>
                </div>
            </div>

        </React.Fragment >
    );
}
