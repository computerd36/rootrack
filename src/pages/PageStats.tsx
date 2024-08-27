import { Card } from 'flowbite-react';
import { useBettingData } from '../context/bettingDataContext';
import { useNavigate } from 'react-router-dom';
import { Stats } from '../types';
import { calculateTotalProfitChangeLastMonth, calculateTotalProfitChangeLast7Days } from '../util/statsCalculations';
import { FaDollarSign } from 'react-icons/fa';
import { PiHandDepositBold } from 'react-icons/pi';


export function PageStats() {
    const { withdrawals, deposits } = useBettingData();
    // const navigate = useNavigate();

    // if (withdrawals.length === 0 || deposits.length === 0) {
    //     navigate('/');
    // }

    const stats: Stats = {
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
    };




    return (
        <div className='w-full h-full bg-slate-950 flex items-center justify-center gap-3'>
            <Card className="bg-indigo-900 w-80">
                <p className='flex items-center gap-1 text-indigo-300'><FaDollarSign /> Profit</p>
                <h3 className='text-5xl text-indigo-100 font-bold'>{stats.totalProfit >= 0 ? ("+" + stats.totalProfit.toFixed(2)) : stats.totalProfit.toFixed(2)} $</h3>
                <p className='text-indigo-200'>{stats.totalProfitChangeLast7Days.toFixed(1)} $ in the last 7 days</p>
            </Card>
            <Card className="bg-indigo-900 w-80">
                <p className='flex items-center gap-1 text-indigo-300'><PiHandDepositBold /> Deposits</p>
                <h3 className='text-5xl text-indigo-100 font-bold'>{stats.totalDepositsValue.toFixed(2)} $</h3>
                <p className='text-indigo-200'>in {stats.totalDeposits} deposits</p>
            </Card>
            <Card className="bg-indigo-900 w-80">
                <p className='flex items-center gap-1 text-indigo-300'><PiHandDepositBold /> Withdrawals</p>
                <h3 className='text-5xl text-indigo-100 font-bold'>{stats.totalWithdrawalsValue.toFixed(2)} $</h3>
                <p className='text-indigo-200'>in {stats.totalWithdrawals} withdrawals</p>
            </Card>
        </div>
    );
}
