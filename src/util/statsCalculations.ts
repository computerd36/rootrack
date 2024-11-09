import { Bet, Deposit, Withdrawal } from "../types";
import { subDays, differenceInCalendarDays, parseISO, closestTo } from 'date-fns';
import { getGameName, getProviderName } from "./gameName";

// Calculate the total profit change in the last 7 days
export function calculateProfitChangeTodayComparedTo7DaysAgo(deposits: Deposit[], withdrawals: Withdrawal[]): number {
    // Get today's date and the date 7 days ago
    const currentDate = new Date();
    const date7DaysAgo = subDays(currentDate, 7);

    // Helper function to find the nearest transaction day before or on a specific date
    function findNearestDate(transactions: { createdAt: string }[], targetDate: Date): Date | null | undefined {
        const dates = transactions.map(t => parseISO(t.createdAt));
        return dates.length > 0 ? closestTo(targetDate, dates) : null;
    }

    // Filter deposits and withdrawals for today
    const depositsToday = deposits.filter(deposit => differenceInCalendarDays(currentDate, parseISO(deposit.createdAt)) === 0);
    const withdrawalsToday = withdrawals.filter(withdrawal => differenceInCalendarDays(currentDate, parseISO(withdrawal.createdAt)) === 0);

    // Find the nearest day with transactions before or on date7DaysAgo
    const nearestDepositDate7DaysAgo = findNearestDate(deposits, date7DaysAgo);
    const nearestWithdrawalDate7DaysAgo = findNearestDate(withdrawals, date7DaysAgo);

    // Filter deposits and withdrawals for the nearest date 7 days ago
    const deposits7DaysAgo = nearestDepositDate7DaysAgo
        ? deposits.filter(deposit => differenceInCalendarDays(nearestDepositDate7DaysAgo, parseISO(deposit.createdAt)) === 0)
        : [];
    const withdrawals7DaysAgo = nearestWithdrawalDate7DaysAgo
        ? withdrawals.filter(withdrawal => differenceInCalendarDays(nearestWithdrawalDate7DaysAgo, parseISO(withdrawal.createdAt)) === 0)
        : [];

    // if there are no transactions for today or 7 days ago, return 0
    if (depositsToday.length === 0 && withdrawalsToday.length === 0 && deposits7DaysAgo.length === 0 && withdrawals7DaysAgo.length === 0) {
        return 0;
    }

    // Calculate profit for today
    const totalDepositsToday = depositsToday.reduce((acc, deposit) => acc + deposit.amount, 0);
    const totalWithdrawalsToday = withdrawalsToday.reduce((acc, withdrawal) => acc + withdrawal.totalValue, 0);
    const profitToday = totalWithdrawalsToday - totalDepositsToday;

    // Calculate profit for the nearest day 7 days ago
    const totalDeposits7DaysAgo = deposits7DaysAgo.reduce((acc, deposit) => acc + deposit.amount, 0);
    const totalWithdrawals7DaysAgo = withdrawals7DaysAgo.reduce((acc, withdrawal) => acc + withdrawal.totalValue, 0);
    const profit7DaysAgo = totalWithdrawals7DaysAgo - totalDeposits7DaysAgo;

    // return the difference in profit
    const profitChangeTodayComparedTo7DaysAgo = profitToday - profit7DaysAgo;

    return profitChangeTodayComparedTo7DaysAgo;
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