// Deposits
interface DepositMeta {
    toAddress: string;
    txHash: string;
    confirmationsOnCompleted: number;
}

export interface Deposit {
    _id: string;
    id: string;
    userId: string;
    recipientAddress: string;
    confirmations: number;
    depositType: string;
    network: string;
    amount: number;
    currency: string;
    externalId: string;
    status: string;
    meta: DepositMeta;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

// Withdraws
interface WithdrawalRequest {
    amount: number;
    plugin: string;
    fields: {
        address: string;
        countryCode: string;
        userFeePaid: number;
    };
    userIp: string;
    totalValue: number;
}

export interface Withdrawal {
    _id: string;
    attempts: number;
    plugin: string;
    network: string;
    totalValue: number;
    userId: string;
    status: string;
    currency: string;
    request: WithdrawalRequest;
    createdAt: string;
    updatedAt: string;
    __v: number;
    transactionId: string;
}

// Bets
export interface Bet {
    betAmount: number;
    currency: string;
    balanceType: string;
    gameNameDisplay?: string; // Optional
    gameIdentifier: string;
    mult: number;
    timestamp: string;
    won: boolean;
    profit: number;
    category?: string; // Optional
}


// Stats
export interface Stats {
    totalDeposits: number;
    totalWithdrawals: number;

    totalDepositsValue: number;
    totalWithdrawalsValue: number;

    totalProfit: number;
    totalProfitPercentage: number;
    totalProfitChangeLast7Days: number;

    biggestDeposit: Deposit;
    biggestWithdrawal: Withdrawal;

    wagered: number;
    totalBets: number;

    biggestWin: Bet;
    biggestMultiplier: Bet;
    biggestLoss: Bet;

    playedGames: { game: string, count: number }[];
    playedCategories: { category: string, count: number }[];
    playedProviders: { provider: string, count: number }[];

    betsPerWeekday: { weekday: string, count: number }[];

}

