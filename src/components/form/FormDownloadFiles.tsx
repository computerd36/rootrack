import { Button } from 'flowbite-react';
import { FaDownload, FaInfoCircle } from 'react-icons/fa';
import { Keybind } from './Keybind';

interface FormDownloadFilesProps {
    keybind: string;
}

export function FormDownloadFiles({ keybind }: Readonly<FormDownloadFilesProps>) {
    return (
        <div className='flex flex-col justify-center h-full'>
            <h2 className='text-white text-2xl text-left font-bold '>Download your deposits and withdrawals from Roobet</h2>
            <h3 className='text-indigo-300 text-sm text-left h-4 mt-2 flex items-center gap-1'>
                <FaInfoCircle /> After clicking the download button, press <Keybind>{keybind}</Keybind> + <Keybind>S</Keybind> in the new tab to save each file.
            </h3>

            <div className='flex gap-2 my-6'>
                <Button
                    className='w-1/2'
                    color={"light"}
                    href={"https://roobet.com/_api/history/withdrawals?type=&order=desc&limit=1000000"}
                    target='_blank'
                >
                    <div className='flex items-center justify-center gap-2'>
                        <FaDownload /> Download withdrawals here
                    </div>
                </Button>
                <Button
                    className='w-1/2'
                    color={"light"}
                    href={"https://roobet.com/_api/history/deposits?type=&order=desc&limit=1000000"}
                    target='_blank'
                >
                    <div className='flex items-center justify-center gap-2'>
                        <FaDownload /> Download deposits here
                    </div>
                </Button>
            </div>
        </div>
    );
}
