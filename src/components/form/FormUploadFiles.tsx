import { FileInput } from 'flowbite-react';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { FaCircleXmark } from 'react-icons/fa6';
import { isValidBet, isValidDeposit, isValidWithdrawal } from '../../util/fileValidator';
import { useBettingData } from '../../context/bettingDataContext';
import { Bet } from '../../types';

export function FormUploadFiles() {

    //context 
    const { setWithdrawals, setDeposits, setBets } = useBettingData();

    const [withdrawalsFile, setWithdrawalsFile] = useState<File | null>(null);
    const [withdrawalsDisabled, setWithdrawalsDisabled] = useState(false);

    const handleWithdrawalsUpload = (file: File) => {
        if (file.name !== 'withdrawals.json') {
            console.log("File is not a valid withdrawals file");
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const json = JSON.parse(e.target?.result as string);
                if (isValidWithdrawal(json.data[0])) {
                    setWithdrawalsFile(file);
                    console.log("Uploaded Withdrawals:", json);
                    setWithdrawalsDisabled(true);
                } else {
                    console.log("Invalid Withdrawals JSON structure");
                }
            } catch (error) {
                console.log("Error parsing Withdrawals JSON: ", error);
            }
        };
        reader.readAsText(file);
    };

    const onFileChangeWithdrawals = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            handleWithdrawalsUpload(event.target.files[0]);
        }
    };

    const [depositsFile, setDepositsFile] = useState<File | null>(null);
    const [depositsDisabled, setDepositsDisabled] = useState(false);

    const handleDepositsUpload = (file: File) => {
        if (file.name !== 'deposits.json') {
            console.log("File is not a valid deposits file");
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const json = JSON.parse(e.target?.result as string);
                if (isValidDeposit(json.data[0])) {
                    setDepositsFile(file);
                    console.log("Uploaded Deposits:", json);
                    setDepositsDisabled(true);
                } else {
                    console.log("Invalid Deposits JSON structure");
                }
            } catch (error) {
                console.log("Error parsing Deposits JSON: ", error);
            }
        };
        reader.readAsText(file);
    };

    const onFileChangeDeposits = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            handleDepositsUpload(event.target.files[0]);
        }
    };

    const [betsFile, setBetsFile] = useState<File | null>(null);
    const [betsDisabled, setBetsDisabled] = useState(false);

    const handleBetsUpload = (file: File) => {
        if (file.name !== 'bets.json') {
            console.log("File is not a valid bets file");
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const json = JSON.parse(e.target?.result as string);

                if (json.data.every(isValidBet)) {
                    setBetsFile(file);
                    console.log("Uploaded Bets:", json);
                    setBetsDisabled(true);
                } else {
                    console.log("Invalid Bets JSON structure");
                }
            } catch (error) {
                console.log("Error parsing Bets JSON: ", error);
            }
        };
        reader.readAsText(file);
    };


    const onFileChangeBets = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            handleBetsUpload(event.target.files[0]);
        }
    };

    useEffect(() => {
        if (withdrawalsFile && depositsFile && betsFile) {
            console.log("All three files uploaded");
            setWithdrawals([]);
            setDeposits([]);
            setBets([]);

            const depositsReader = new FileReader();

            depositsReader.onload = (e) => {
                try {
                    const json = JSON.parse(e.target?.result as string);
                    if (json.data.every(isValidDeposit)) {
                        setDeposits(json.data);
                        console.log("Uploaded Deposits:", json);
                    } else {
                        alert("Invalid Deposits JSON structure");
                    }
                } catch (error) {
                    alert("Error parsing Deposits JSON: " + error);
                }
            };

            depositsReader.readAsText(depositsFile);

            const withdrawalsReader = new FileReader();

            withdrawalsReader.onload = (e) => {
                try {
                    const json = JSON.parse(e.target?.result as string);
                    if (json.data.every(isValidWithdrawal)) {
                        setWithdrawals(json.data);
                        console.log("Uploaded Withdrawals:", json);
                    } else {
                        alert("Invalid Withdrawals JSON structure");
                    }
                } catch (error) {
                    alert("Error parsing Withdrawals JSON: " + error);
                }
            };

            withdrawalsReader.readAsText(withdrawalsFile);

            const betsReader = new FileReader();

            betsReader.onload = (e) => {
                try {
                    const json = JSON.parse(e.target?.result as string);
                    if (json.data.every(isValidBet)) {
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
                            category: bet.category
                        }));
                        setBets(bets);
                        console.log("Uploaded Bets:", bets);
                    } else {
                        alert("Invalid Bets JSON structure");
                    }
                } catch (error) {
                    alert("Error parsing Bets JSON: " + error);
                }
            };

            betsReader.readAsText(betsFile);

        }
    }, [betsFile, depositsFile, setBets, setDeposits, setWithdrawals, withdrawalsFile]);

    return (
        <React.Fragment>
            <div className='flex flex-col justify-between h-full gap-3 mb-5'>
                <div>
                    <h2 className='text-white text-2xl text-left font-bold'>Select your files from Roobet</h2>
                    <h3 className='text-indigo-300 text-sm text-left mt-0 flex items-center gap-1'>All calculations and statistics are processed locally on your computer, no files are sent to external servers.</h3>
                </div>
                <div className='flex items-center justify-between'>
                    <h2 className='text-white text-xl font-bold flex items-center gap-2'>{withdrawalsFile ? <FaCheckCircle color='green' /> : <FaCircleXmark color='red' />} Withdrawals</h2>
                    <FileInput id="file-upload-withdrawals" className='w-1/2 sm:w-2/3 md:w-3/4' accept='.json' onChange={onFileChangeWithdrawals} disabled={withdrawalsDisabled} />
                </div>
                <div className='flex items-center justify-between'>
                    <h2 className='text-white text-xl font-bold flex items-center gap-2'>{depositsFile ? <FaCheckCircle color='green' /> : <FaCircleXmark color='red' />} Deposits</h2>
                    <FileInput id="file-upload-deposits" className='w-1/2 sm:w-2/3 md:w-3/4' accept='.json' onChange={onFileChangeDeposits} disabled={depositsDisabled} />
                </div>
                <div className='flex items-center justify-between'>
                    <h2 className='text-white text-xl font-bold flex items-center gap-2'>{betsFile ? <FaCheckCircle color='green' /> : <FaCircleXmark color='red' />} Bets</h2>
                    <FileInput id="file-upload-bets" className=' w-1/2 sm:w-2/3 md:w-3/4' accept='.json' onChange={onFileChangeBets} disabled={betsDisabled} />
                </div>
            </div>
        </React.Fragment >
    );
}
