import { Button } from '../UI/Button';
import { FaDownload, FaInfoCircle } from 'react-icons/fa';
import { Keybind } from './Keybind';

interface FormDownloadFilesProps {
    keybind: string;
}

export function FormDownloadFiles({ keybind }: Readonly<FormDownloadFilesProps>) {
    return (
        <div className='flex flex-col justify-center h-full'>
            <h2 className='text-white text-2xl text-left font-bold '>Download your deposits and withdrawals from Roobet</h2>
            <h3 className='text-indigo-300 text-sm text-left mt-2 flex items-start gap-1'>
                <FaInfoCircle className='shrink-0 mt-0.5' />
                <span>After clicking the download button, press <span className='inline-flex items-center gap-1 whitespace-nowrap'><Keybind>{keybind}</Keybind> + <Keybind>S</Keybind></span> in the new tab to save each file.</span>
            </h3>

            <div className='flex flex-col sm:flex-row gap-4 my-6'>
                <Button
                    className='sm:w-1/2'
                    linkTo={"https://roobet.com/_api/history/withdrawals?type=&order=desc&limit=1000000"}
                    ariaLabel='Download withdrawals'
                    isFullWidth
                    inverted
                >
                    <div className='flex items-center justify-center gap-2'>
                        <FaDownload /> Download withdrawals here
                    </div>
                </Button>
                <Button
                    className='sm:w-1/2'
                    linkTo={"https://roobet.com/_api/history/deposits?type=&order=desc&limit=1000000"}
                    ariaLabel='Download deposits'
                    isFullWidth
                    inverted
                >
                    <div className='flex items-center justify-center gap-2'>
                        <FaDownload /> Download deposits here
                    </div>
                </Button>
            </div>
        </div>
    );
}
