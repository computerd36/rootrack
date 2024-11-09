// src/hooks/useBettingStats.ts
import { useEffect, useState } from 'react';


import { Bet, Deposit, Stats, Withdrawal } from '../types';
import {
    calculateProfitChangeOverLast7Days,
    determineMostPlayedGames,
    determineMostPlayedCategories,
    determineMostPlayedProviders,
    determineBetsPerWeekday
} from '../util/statsCalculations';
import { useNavigate } from 'react-router-dom';

export function useBettingStats(deposits: Deposit[], withdrawals: Withdrawal[], bets: Bet[]) {
    const [stats, setStats] = useState<Stats | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (withdrawals.length !== 0 && deposits.length !== 0 && bets.length !== 0) {
            const totalDepositsValue = deposits.reduce((acc, deposit) => acc + deposit.amount, 0);
            const totalWithdrawalsValue = withdrawals.reduce((acc, withdrawal) => acc + withdrawal.totalValue, 0);
            const totalProfit = totalWithdrawalsValue - totalDepositsValue;

            setStats({
                userName: bets[0].user ? bets[0].user.name : 'Unknown',
                totalDeposits: deposits.length,
                totalWithdrawals: withdrawals.length,
                totalDepositsValue: totalDepositsValue,
                totalWithdrawalsValue: totalWithdrawalsValue,
                totalProfit: totalProfit,
                totalProfitPercentage: (totalProfit / totalDepositsValue) * 100,
                totalProfitChangeLast7Days: calculateProfitChangeOverLast7Days(deposits, withdrawals),
                biggestDeposit: deposits.reduce((biggest, deposit) => deposit.amount > biggest.amount ? deposit : biggest, deposits[0]),
                biggestWithdrawal: withdrawals.reduce((biggest, withdrawal) => withdrawal.totalValue > biggest.totalValue ? withdrawal : biggest, withdrawals[0]),
                wagered: bets.reduce((acc, bet) => acc + bet.betAmount, 0),
                totalBets: bets.length,
                biggestWin: bets.reduce((biggest, bet) => bet.profit > biggest.profit ? bet : biggest, bets[0]),
                biggestMultiplier: bets.reduce((biggest, bet) => bet.mult > biggest.mult ? bet : biggest, bets[0]),
                biggestLoss: bets.reduce((biggest, bet) => bet.profit < biggest.profit ? bet : biggest, bets[0]),
                playedGames: determineMostPlayedGames(bets),
                playedCategories: determineMostPlayedCategories(bets),
                playedProviders: determineMostPlayedProviders(bets),
                betsPerWeekday: determineBetsPerWeekday(bets),
            });
            setIsLoading(false);
        } else {
            navigate("/");
        }
    }, [withdrawals, deposits, bets, navigate]);

    return { stats, isLoading };
}
