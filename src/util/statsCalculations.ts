import { Deposit, Withdrawal } from "../types";
import { subMonths, subDays, isAfter, isBefore, isSameMonth } from 'date-fns';

export const parseDate = (dateString: string): Date => new Date(dateString);

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
