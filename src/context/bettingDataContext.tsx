import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Deposit, Withdrawal } from '../types';

// Define the types for the context
interface BettingDataContextType {
    withdrawals: Withdrawal[];  // Adjust the type to match your withdrawal data structure
    deposits: Deposit[];     // Adjust the type to match your deposit data structure
    setWithdrawals: React.Dispatch<React.SetStateAction<Withdrawal[]>>;
    setDeposits: React.Dispatch<React.SetStateAction<Deposit[]>>;
}

// Create the context
const BettingDataContext = createContext<BettingDataContextType | undefined>(undefined);

// Provider component
export const BettingDataContextProvider = ({ children }: { children: ReactNode }) => {
    const [withdrawals, setWithdrawals] = useState<Withdrawal[]>([]);
    const [deposits, setDeposits] = useState<Deposit[]>([]);

    return (
        <BettingDataContext.Provider value={{ withdrawals, deposits, setWithdrawals, setDeposits }}>
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
