import { Bet, Deposit, Withdrawal } from "../types";
import { subMonths, subDays, isAfter, isBefore, isSameMonth } from 'date-fns';
import { getGameName } from "./gameName";

export const parseDate = (dateString: string): Date => new Date(dateString);

// Calculate the total profit change in the last month
export function calculateTotalProfitChangeLastMonth(deposits: Deposit[], withdrawals: Withdrawal[]): number {
    // Get the current date and the previous months
    const currentDate = new Date();
    const lastMonthDate = subMonths(currentDate, 1);
    const twoMonthsAgoDate = subMonths(currentDate, 2);

    // Filter deposits and withdrawals for the last month
    const depositsLastMonth = deposits.filter(deposit => isSameMonth(parseDate(deposit.createdAt), lastMonthDate));
    const withdrawalsLastMonth = withdrawals.filter(withdrawal => isSameMonth(parseDate(withdrawal.createdAt), lastMonthDate));

    // Filter deposits and withdrawals for the month before last month
    const depositsPreviousMonth = deposits.filter(deposit => isSameMonth(parseDate(deposit.createdAt), twoMonthsAgoDate));
    const withdrawalsPreviousMonth = withdrawals.filter(withdrawal => isSameMonth(parseDate(withdrawal.createdAt), twoMonthsAgoDate));

    // Calculate profit for last month
    const totalDepositsLastMonth = depositsLastMonth.reduce((acc, deposit) => acc + deposit.amount, 0);
    const totalWithdrawalsLastMonth = withdrawalsLastMonth.reduce((acc, withdrawal) => acc + withdrawal.totalValue, 0);
    const profitLastMonth = totalWithdrawalsLastMonth - totalDepositsLastMonth;

    // Calculate profit for the previous month
    const totalDepositsPreviousMonth = depositsPreviousMonth.reduce((acc, deposit) => acc + deposit.amount, 0);
    const totalWithdrawalsPreviousMonth = withdrawalsPreviousMonth.reduce((acc, withdrawal) => acc + withdrawal.totalValue, 0);
    const profitPreviousMonth = totalWithdrawalsPreviousMonth - totalDepositsPreviousMonth;

    // Return the profit change (amount, not percentage)
    const profitChangeLastMonth = profitLastMonth - profitPreviousMonth;

    return profitChangeLastMonth;
}

// Calculate the total profit change in the last 7 days
export function calculateTotalProfitChangeLast7Days(deposits: Deposit[], withdrawals: Withdrawal[]): number {
    // Get the current date and the dates for the last 7 days and the 7 days before that
    const currentDate = new Date();
    const sevenDaysAgo = subDays(currentDate, 7);
    const fourteenDaysAgo = subDays(currentDate, 14);

    // Filter deposits and withdrawals for the last 7 days
    const depositsLast7Days = deposits.filter(deposit => isAfter(parseDate(deposit.createdAt), sevenDaysAgo));
    const withdrawalsLast7Days = withdrawals.filter(withdrawal => isAfter(parseDate(withdrawal.createdAt), sevenDaysAgo));

    // Filter deposits and withdrawals for the 7 days before the last 7 days
    const depositsPrevious7Days = deposits.filter(deposit => isAfter(parseDate(deposit.createdAt), fourteenDaysAgo) && isBefore(parseDate(deposit.createdAt), sevenDaysAgo));
    const withdrawalsPrevious7Days = withdrawals.filter(withdrawal => isAfter(parseDate(withdrawal.createdAt), fourteenDaysAgo) && isBefore(parseDate(withdrawal.createdAt), sevenDaysAgo));

    // Calculate profit for the last 7 days
    const totalDepositsLast7Days = depositsLast7Days.reduce((acc, deposit) => acc + deposit.amount, 0);
    const totalWithdrawalsLast7Days = withdrawalsLast7Days.reduce((acc, withdrawal) => acc + withdrawal.totalValue, 0);
    const profitLast7Days = totalWithdrawalsLast7Days - totalDepositsLast7Days;

    // Calculate profit for the 7 days before the last 7 days
    const totalDepositsPrevious7Days = depositsPrevious7Days.reduce((acc, deposit) => acc + deposit.amount, 0);
    const totalWithdrawalsPrevious7Days = withdrawalsPrevious7Days.reduce((acc, withdrawal) => acc + withdrawal.totalValue, 0);
    const profitPrevious7Days = totalWithdrawalsPrevious7Days - totalDepositsPrevious7Days;

    // Return the profit change (amount, not percentage)
    const profitChangeLast7Days = profitLast7Days - profitPrevious7Days;

    return profitChangeLast7Days;
}

//determine the three most played games from the bets and how many times they were played
export function determineMostPlayedGames(bets: Bet[]): { game: string, count: number }[] {
    const gamesPlayed: { [key: string]: number } = {};


    bets.forEach(bet => {
        if (!bet.gameIdentifier) {
            return;
        }

        const game = getGameName(bet);

        if (!gamesPlayed[game]) {
            gamesPlayed[game] = 1;
        } else {
            gamesPlayed[game]++;
        }
    });

    const sortedGames = Object.keys(gamesPlayed).sort((a, b) => gamesPlayed[b] - gamesPlayed[a]);

    return sortedGames.map(game => ({ game, count: gamesPlayed[game] }));
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