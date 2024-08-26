import { Button } from 'flowbite-react';
import React from 'react';

export function FormDownloadFiles() {
    return (
        <React.Fragment>
            <div className='flex flex-col justify-center h-full'>
                <h2 className='text-white text-xl font-bold'>Download your deposits and withdraws from Roobet</h2>
                <div className='flex gap-2 my-5'>
                    <Button className='w-1/2' color={"light"}>Download withdraws here</Button>
                    <Button className='w-1/2' color={"light"}>Download deposits here</Button>
                </div>
                <h2 className='text-white text-xl font-bold'>After you downloaded both, click on next step</h2>
            </div>

        </React.Fragment>
    );
}
