import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Bet, Deposit, Withdrawal } from '../types';

// Define the types for the context
interface BettingDataContextType {
    withdrawals: Withdrawal[];
    deposits: Deposit[];
    bets: Bet[];
    setWithdrawals: React.Dispatch<React.SetStateAction<Withdrawal[]>>;
    setDeposits: React.Dispatch<React.SetStateAction<Deposit[]>>;
    setBets: React.Dispatch<React.SetStateAction<Bet[]>>;
}

// Create the context
const BettingDataContext = createContext<BettingDataContextType | undefined>(undefined);

// Provider component
export const BettingDataContextProvider = ({ children }: { children: ReactNode }) => {
    const [withdrawals, setWithdrawals] = useState<Withdrawal[]>([]);
    const [deposits, setDeposits] = useState<Deposit[]>([]);
    const [bets, setBets] = useState<Bet[]>([]);

    return (
        <BettingDataContext.Provider value={{ withdrawals, deposits, bets, setWithdrawals, setDeposits, setBets }}>
            {children}
        </BettingDataContext.Provider>
    );
};

// Hook for consuming the context
export const useBettingData = () => {
    const context = useContext(BettingDataContext);
    if (!context) {
        throw new Error("useFileData must be used within a FileDataProvider");
    }
    return context;
};
