import { useBettingData } from '../context/bettingDataContext';
import { useNavigate } from 'react-router-dom';
import { Stats } from '../types';
import { calculateTotalProfitChangeLastMonth, calculateTotalProfitChangeLast7Days } from '../util/statsCalculations';
import { PiHandDepositBold, PiHandWithdrawBold } from 'react-icons/pi';
import { useEffect, useState } from 'react';
import { LoadingPage } from '../components/LoadingPage';
import { StatsCard } from '../components/stats/StatsCard';
import { FaDollarSign } from 'react-icons/fa';


export function PageStats() {
    const { withdrawals, deposits } = useBettingData();
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(true);

    const [stats, setStats] = useState<Stats | null>(null);


    useEffect(() => {
        if (withdrawals.length !== 0 && deposits.length !== 0) {
            setStats({
                totalDeposits: deposits.length,
                totalWithdrawals: withdrawals.length,

                // Total value of deposits (money spent)
                totalDepositsValue: deposits.reduce((acc, deposit) => acc + deposit.amount, 0),

                // Total value of withdrawals (money gained)
                totalWithdrawalsValue: withdrawals.reduce((acc, withdrawal) => acc + withdrawal.totalValue, 0),

                // Profit is calculated as withdrawals (gains) minus deposits (losses)
                totalProfit: withdrawals.reduce((acc, withdrawal) => acc + withdrawal.totalValue, 0) - deposits.reduce((acc, deposit) => acc + deposit.amount, 0),

                // Profit percentage relative to deposits
                totalProfitPercentage: ((withdrawals.reduce((acc, withdrawal) => acc + withdrawal.totalValue, 0) - deposits.reduce((acc, deposit) => acc + deposit.amount, 0)) / deposits.reduce((acc, deposit) => acc + deposit.amount, 0)) * 100,

                // Calculating the change in profit from last week
                totalProfitChangeLast7Days: calculateTotalProfitChangeLast7Days(deposits, withdrawals),

                // Calculating the change in profit from last month
                totalProfitChangeLastMonth: calculateTotalProfitChangeLastMonth(deposits, withdrawals),


                // Biggest deposit
                biggestDeposit: deposits.reduce((biggest, deposit) => deposit.amount > biggest.amount ? deposit : biggest, deposits[0]),

                // Biggest withdrawal
                biggestWithdrawal: withdrawals.reduce((biggest, withdrawal) => withdrawal.totalValue > biggest.totalValue ? withdrawal : biggest, withdrawals[0]),
            });
            setIsLoading(false);
        } else {
            navigate("/");
        }
    }, [withdrawals, deposits, navigate]);


    if (isLoading) {
        return (
            <LoadingPage />
        );
    }


    return (
        <div className='w-full h-full bg-slate-950 flex items-center justify-center gap-3'>
            <StatsCard
                title='Deposits'
                icon={<PiHandDepositBold />}
                value={stats!.totalDepositsValue}
                description={"in " + stats!.totalDeposits + " deposits"}
            />
            <StatsCard
                title='Profit'
                icon={<FaDollarSign />}
                value={stats!.totalProfit}
                description={stats!.totalProfitChangeLast7Days.toFixed(1) + " $ in the last 7 days"}
            />
            <StatsCard
                title='Withdrawals'
                icon={<PiHandWithdrawBold />}
                value={stats!.totalWithdrawalsValue}
                description={"in " + stats!.totalWithdrawals + " withdrawals"}
            />
        </div>
    );
}
