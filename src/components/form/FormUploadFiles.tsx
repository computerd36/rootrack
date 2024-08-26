import { FileInput } from 'flowbite-react';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { FaCircleXmark } from 'react-icons/fa6';
import { isValidDeposit, isValidWithdrawal } from '../../util/fileValidator';
import { useBettingData } from '../../context/bettingDataContext';

export function FormUploadFiles() {

    //context 
    const { setWithdrawals, setDeposits } = useBettingData();

    const [withdrawalsFile, setWithdrawalsFile] = useState<File | null>(null);

    const handleWithdrawalsUpload = (file: File) => {
        if (file.name !== 'withdrawals.json') {
            console.log("File is not a valid withdrawals file");
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const json = JSON.parse(e.target?.result as string);
                console.log("Withdrawals JSON:", json); // Log the JSON
                if (isValidWithdrawal(json.data[0])) {
                    setWithdrawalsFile(file);
                    console.log("Uploaded Withdrawals:", json);
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

    const handleDepositsUpload = (file: File) => {
        if (file.name !== 'deposits.json') {
            console.log("File is not a valid deposits file");
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const json = JSON.parse(e.target?.result as string);
                console.log("Deposits JSON:", json); // Log the JSON
                if (isValidDeposit(json.data[0])) {
                    setDepositsFile(file);
                    console.log("Uploaded Deposits:", json);
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

    useEffect(() => {
        if (withdrawalsFile && depositsFile) {
            console.log("Both files uploaded");
            setWithdrawals([]);
            setDeposits([]);

            const reader = new FileReader();

            reader.onload = (e) => {
                try {
                    const json = JSON.parse(e.target?.result as string);
                    console.log("Deposits JSON:", json); // Log the JSON
                    if (json.data.every(isValidDeposit)) {
                        setDeposits(json.data);
                        console.log("Uploaded Deposits:", json);
                    } else {
                        console.log("Invalid Deposits JSON structure");
                    }
                } catch (error) {
                    console.log("Error parsing Deposits JSON: ", error);
                }
            };

            reader.readAsText(depositsFile);

            const reader2 = new FileReader();

            reader2.onload = (e) => {
                try {
                    const json = JSON.parse(e.target?.result as string);
                    console.log("Withdrawals JSON:", json); // Log the JSON
                    if (json.data.every(isValidWithdrawal)) {
                        setWithdrawals(json.data);
                        console.log("Uploaded Withdrawals:", json);
                    } else {
                        console.log("Invalid Withdrawals JSON structure");
                    }
                } catch (error) {
                    console.log("Error parsing Withdrawals JSON: ", error);
                }
            };

            reader2.readAsText(withdrawalsFile);
        }
    }, [depositsFile, setDeposits, setWithdrawals, withdrawalsFile]);


    return (
        <React.Fragment>
            <div className='flex flex-col justify-center h-full gap-3'>
                <h2 className='text-white text-2xl text-center font-bold mb-5'>Upload your deposits and withdrawals from Roobet</h2>
                <div className='flex items-center justify-between'>
                    <h2 className='text-white text-xl font-bold flex items-center gap-2'>{withdrawalsFile ? <FaCheckCircle color='green' /> : <FaCircleXmark color='red' />} Withdrawals</h2>
                    <FileInput id="file-upload" className='w-3/4' accept='.json' onChange={onFileChangeWithdrawals} />
                </div>
                <div className='flex items-center justify-between'>
                    <h2 className='text-white text-xl font-bold flex items-center gap-2'>{depositsFile ? <FaCheckCircle color='green' /> : <FaCircleXmark color='red' />} Deposits</h2>
                    <FileInput id="file-upload" className='w-3/4' accept='.json' onChange={onFileChangeDeposits} />
                </div>
            </div>
        </React.Fragment >
    );
}
