import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Bet, Deposit, Withdrawal } from '../types';

// Define the types for the context
interface BettingDataContextType {
    withdrawals: Withdrawal[];
    deposits: Deposit[];
    bets: Bet[];
    creationDate: string | null;
    setWithdrawals: React.Dispatch<React.SetStateAction<Withdrawal[]>>;
    setDeposits: React.Dispatch<React.SetStateAction<Deposit[]>>;
    setBets: React.Dispatch<React.SetStateAction<Bet[]>>;
    clearBettingData: () => void;
    isBettingDataStored: () => boolean;
}

// Create the context
const BettingDataContext = createContext<BettingDataContextType | undefined>(undefined);

// Provider component
export const BettingDataContextProvider = ({ children }: { children: ReactNode }) => {
    // Initialize state from local storage or with empty arrays
    const [withdrawals, setWithdrawals] = useState<Withdrawal[]>(
        () => JSON.parse(localStorage.getItem('withdrawals') || '[]')
    );
    const [deposits, setDeposits] = useState<Deposit[]>(
        () => JSON.parse(localStorage.getItem('deposits') || '[]')
    );
    const [bets, setBets] = useState<Bet[]>(
        () => JSON.parse(localStorage.getItem('bets') || '[]')
    );
    const [creationDate, setCreationDate] = useState<string | null>(
        () => localStorage.getItem('creationDate')
    );

    // Use useEffect to update local storage when the state changes
    useEffect(() => {
        if (withdrawals.length || deposits.length || bets.length) {
            // Set the creation date if not already set
            if (!creationDate) {
                const date = new Date().toISOString();
                setCreationDate(date);
                localStorage.setItem('creationDate', date);
            }
        }

        localStorage.setItem('withdrawals', JSON.stringify(withdrawals));
        localStorage.setItem('deposits', JSON.stringify(deposits));
        localStorage.setItem('bets', JSON.stringify(bets));
    }, [withdrawals, deposits, bets, creationDate]);

    // Function to clear all betting data and local storage
    const clearBettingData = () => {
        setWithdrawals([]);
        setDeposits([]);
        setBets([]);
        setCreationDate(null);
        localStorage.removeItem('withdrawals');
        localStorage.removeItem('deposits');
        localStorage.removeItem('bets');
        localStorage.removeItem('creationDate');
    };

    // Function to check if any betting data is stored
    const isBettingDataStored = () => {
        return (
            withdrawals.length > 0 ||
            deposits.length > 0 ||
            bets.length > 0
        );
    };

    return (
        <BettingDataContext.Provider
            value={{
                withdrawals,
                deposits,
                bets,
                creationDate,
                setWithdrawals,
                setDeposits,
                setBets,
                clearBettingData,
                isBettingDataStored
            }}
        >
            {children}
        </BettingDataContext.Provider>
    );
};

// Hook for consuming the context
export const useBettingData = () => {
    const context = useContext(BettingDataContext);
    if (!context) {
        throw new Error("useBettingData must be used within a BettingDataContextProvider");
    }
    return context;
};
