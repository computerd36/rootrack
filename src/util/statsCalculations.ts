import { Bet, Deposit, Withdrawal } from "../types";
import { subDays, parseISO, max } from 'date-fns';
import { getGameName, getProviderName } from "./gameName";

export function calculateProfitChangeOverLast7Days(
    deposits: Deposit[],
    withdrawals: Withdrawal[]
): number {
    // Combine all transaction dates
    const allTransactionDates = [
        ...deposits.map((d) => parseISO(d.createdAt)),
        ...withdrawals.map((w) => parseISO(w.createdAt)),
    ];

    if (allTransactionDates.length === 0) {
        return 0; // No transactions
    }

    // Find the latest transaction date
    const latestTransactionDate = max(allTransactionDates);

    // Date 7 days before the latest transaction date
    const date7DaysAgo = subDays(latestTransactionDate, 7);

    // Calculate cumulative deposits and withdrawals up to latestTransactionDate
    const cumulativeDepositsLatest = deposits
        .filter((deposit) => parseISO(deposit.createdAt) <= latestTransactionDate)
        .reduce((acc, deposit) => acc + deposit.amount, 0);

    const cumulativeWithdrawalsLatest = withdrawals
        .filter((withdrawal) => parseISO(withdrawal.createdAt) <= latestTransactionDate)
        .reduce((acc, withdrawal) => acc + withdrawal.totalValue, 0);

    const cumulativeProfitLatest = cumulativeWithdrawalsLatest - cumulativeDepositsLatest;

    // Calculate cumulative deposits and withdrawals up to date7DaysAgo
    const cumulativeDeposits7DaysAgo = deposits
        .filter((deposit) => parseISO(deposit.createdAt) <= date7DaysAgo)
        .reduce((acc, deposit) => acc + deposit.amount, 0);

    const cumulativeWithdrawals7DaysAgo = withdrawals
        .filter((withdrawal) => parseISO(withdrawal.createdAt) <= date7DaysAgo)
        .reduce((acc, withdrawal) => acc + withdrawal.totalValue, 0);

    const cumulativeProfit7DaysAgo = cumulativeWithdrawals7DaysAgo - cumulativeDeposits7DaysAgo;

    // Return the difference in cumulative profit over the last 7 days
    const profitChangeOver7Days = cumulativeProfitLatest - cumulativeProfit7DaysAgo;

    return profitChangeOver7Days;
}


// determine the most played games by counting the number of bets for each game and sorting them
export function determineMostPlayedGames(bets: Bet[]): { game: string, provider: string, count: number }[] {
    const gamesPlayed: { [key: string]: { provider: string, count: number } } = {};

    bets.forEach(bet => {
        if (!bet.gameIdentifier) {
            return;
        }

        const game = getGameName(bet);

        if (!gamesPlayed[game]) {
            // Only retrieve and set the provider once when the game is first encountered
            const provider = getProviderName(bet);
            gamesPlayed[game] = { provider, count: 1 };
        } else {
            // Increment the count if the game is already in the object
            gamesPlayed[game].count++;
        }
    });

    const sortedGames = Object.keys(gamesPlayed).sort((a, b) => gamesPlayed[b].count - gamesPlayed[a].count);

    return sortedGames.map(game => ({
        game,
        provider: gamesPlayed[game].provider,
        count: gamesPlayed[game].count
    }));
}


export function determineMostPlayedCategories(bets: Bet[]): { category: string, count: number }[] {
    const categoriesPlayed: { [key: string]: number } = {};

    bets.forEach(bet => {
        if (!bet.category) {
            return;
        }
        if (!categoriesPlayed[bet.category]) {
            categoriesPlayed[bet.category] = 1;
        } else {
            categoriesPlayed[bet.category]++;
        }
    });

    const sortedCategories = Object.keys(categoriesPlayed).sort((a, b) => categoriesPlayed[b] - categoriesPlayed[a]);

    return sortedCategories.map(category => ({ category, count: categoriesPlayed[category] }));
}

export function determineMostPlayedProviders(bets: Bet[]): { provider: string, count: number }[] {
    const providersPlayed: { [key: string]: number } = {};

    bets.forEach(bet => {
        if (!bet.gameIdentifier) {
            return;
        }

        const provider = bet.gameIdentifier.split(':')[0];

        if (!providersPlayed[provider]) {
            providersPlayed[provider] = 1;
        } else {
            providersPlayed[provider]++;
        }
    });

    const sortedProviders = Object.keys(providersPlayed).sort((a, b) => providersPlayed[b] - providersPlayed[a]);

    return sortedProviders.map(provider => ({ provider, count: providersPlayed[provider] }));
}

export function determineBetsPerWeekday(bets: Bet[]): { weekday: string, count: number }[] {
    const weekdays: { [key: string]: number } = {
        Sunday: 0,
        Monday: 0,
        Tuesday: 0,
        Wednesday: 0,
        Thursday: 0,
        Friday: 0,
        Saturday: 0,
    };

    bets.forEach(bet => {
        const date = new Date(bet.timestamp);
        const weekday = date.toLocaleDateString('en-US', { weekday: 'long' });

        weekdays[weekday]++;
    });

    // Shorten the weekday name to 3 letters and return the data unsorted
    return Object.keys(weekdays).map(weekday => ({ weekday: weekday.slice(0, 2), count: weekdays[weekday] }));
}