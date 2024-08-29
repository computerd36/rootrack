import { Button } from 'flowbite-react';
import React from 'react';
import { FaDownload, FaInfoCircle } from 'react-icons/fa';

export function FormDownloadFiles() {
    return (
        <React.Fragment>
            <div className='flex flex-col justify-center h-full'>
                <h2 className='text-white text-2xl text-left font-bold '>Download your deposits and withdrawals from Roobet</h2>
                <h3 className='text-indigo-300 text-sm text-left mt-0 flex items-center gap-1'><FaInfoCircle />You must be logged into your Roobet account in this browser for the download to function properly</h3>
                <div className='flex gap-2 my-6'>
                    <Button className='w-1/2' color={"light"} href="https://roobet.com/_api/history/withdrawals?type=&order=desc&limit=1000000" target='_blank'><div className='flex items-center justify-center gap-2'><FaDownload /> Download withdrawals here</div></Button>
                    <Button className='w-1/2' color={"light"} href='https://roobet.com/_api/history/deposits?type=&order=desc&limit=1000000' target='_blank'><div className='flex items-center justify-center gap-2'><FaDownload />Download deposits here</div></Button>
                </div>
            </div>
        </React.Fragment >
    );
}
