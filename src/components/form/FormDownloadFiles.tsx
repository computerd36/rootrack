import { Button } from 'flowbite-react';
import React from 'react';
import { FaDownload } from 'react-icons/fa';

export function FormDownloadFiles() {
    return (
        <React.Fragment>
            <div className='flex flex-col justify-center h-full'>
                <h2 className='text-white text-2xl text-center font-bold mb-5'> Download your deposits and withdrawals from Roobet</h2>
                <div className='flex gap-2 my-5'>
                    <Button className='w-1/2' color={"light"} href="https://roobet.com/_api/history/withdrawals?type=&order=desc&limit=1000000" target='_blank'><div className='flex items-center justify-center gap-2'><FaDownload /> Download withdrawals here</div></Button>
                    <Button className='w-1/2' color={"light"} href='https://roobet.com/_api/history/deposits?type=&order=desc&limit=1000000' target='_blank'><div className='flex items-center justify-center gap-2'><FaDownload />Download deposits here</div></Button>
                </div>
            </div>

        </React.Fragment >
    );
}
