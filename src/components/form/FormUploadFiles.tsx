import { useState } from 'react';
import { FaCheckCircle, FaFileUpload, FaInfoCircle } from 'react-icons/fa';
import { FaCircleXmark } from 'react-icons/fa6';
import { useDropzone } from 'react-dropzone';
import { isValidBet, isValidDeposit, isValidWithdrawal } from '../../util/fileValidator';
import { useBettingData } from '../../context/bettingDataContext';
import { Bet } from '../../types';
import { incrementCounter } from '../../firebase/counter';

export function FormUploadFiles() {
    const { setWithdrawals, setDeposits, setBets } = useBettingData();

    const [filesStatus, setFilesStatus] = useState({
        withdrawals: false,
        deposits: false,
        bets: false,
    });

    const onDrop = (acceptedFiles: File[]) => {
        acceptedFiles.forEach((file) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const json = JSON.parse(e.target?.result as string);

                    if (file.name === 'withdrawals.json' && isValidWithdrawal(json.data[0])) {
                        setWithdrawals(json.data);
                        setFilesStatus(prev => ({ ...prev, withdrawals: true }));
                    } else if (file.name === 'deposits.json' && isValidDeposit(json.data[0])) {
                        setDeposits(json.data);
                        setFilesStatus(prev => ({ ...prev, deposits: true }));
                    } else if (file.name === 'bets.json' && json.data.every(isValidBet)) {
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        const bets = json.data.map((bet: any): Bet => ({
                            betAmount: bet.betAmount,
                            currency: bet.currency,
                            balanceType: bet.balanceType,
                            gameNameDisplay: bet.gameNameDisplay,
                            gameIdentifier: bet.gameIdentifier,
                            mult: bet.mult,
                            timestamp: bet.timestamp,
                            won: bet.won,
                            profit: bet.profit,
                            category: bet.category,
                        }));
                        setBets(bets);
                        setFilesStatus(prev => ({ ...prev, bets: true }));
                        incrementCounter();
                    } else {
                        console.log(`Invalid or unrecognized file: ${file.name}`);
                    }
                } catch (error) {
                    console.log(`Error parsing ${file.name}: `, error);
                }
            };
            reader.readAsText(file);
        });
    };

    const { getRootProps, getInputProps } = useDropzone({ onDrop, accept: { 'application/json': ['.json'] } });

    return (
        <div className='flex flex-col justify-between h-full gap-3'>
            <div>
                <h2 className='text-white text-2xl text-left font-bold'>Drop your files from Roobet</h2>
                <h3 className='text-indigo-300 text-sm text-left h-4 mt-2 flex items-center gap-1'>
                    <FaInfoCircle />  Calculations are processed locally on your computer, no files are sent to external servers.
                </h3>
            </div>

            <div
                {...getRootProps()}
                className='border-dashed border-2 border-gray-300 my-2 p-5 text-center cursor-pointer rounded-md bg-slate-800 flex flex-col items-center justify-center gap-2'
            >
                <input {...getInputProps()} />
                <FaFileUpload size={32} className='text-indigo-200' />
                <p className='text-indigo-300/50'>Drag & drop the files you just downloaded, or click to select files</p>
            </div>

            <div className='flex justify-center gap-8'>
                <h2 className='text-white text-md font-semibold flex items-center gap-2'>
                    {filesStatus.withdrawals ? <FaCheckCircle color='green' /> : <FaCircleXmark color='red' />} Withdrawals
                </h2>
                <h2 className='text-white text-md font-semibold flex items-center gap-2'>
                    {filesStatus.deposits ? <FaCheckCircle color='green' /> : <FaCircleXmark color='red' />} Deposits
                </h2>
                <h2 className='text-white text-md font-semibold flex items-center gap-2'>
                    {filesStatus.bets ? <FaCheckCircle color='green' /> : <FaCircleXmark color='red' />} Bets
                </h2>
            </div>
        </div>
    );
}
