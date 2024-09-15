import { useBettingData } from '../context/bettingDataContext';
import { useNavigate } from 'react-router-dom';
import { Stats } from '../types';
import { calculateProfitChangeTodayComparedTo7DaysAgo, determineMostPlayedGames, determineMostPlayedCategories, determineMostPlayedProviders, determineBetsPerWeekday } from '../util/statsCalculations';
import { PiHandDepositBold, PiHandWithdrawBold } from 'react-icons/pi';
import { useEffect, useRef, useState } from 'react';
import { LoadingPage } from '../components/LoadingPage';
import { StatsMoneyCard } from '../components/stats/StatsMoneyCard';
import { FaDollarSign, FaTimes } from 'react-icons/fa';
import { ProfitLineChart } from '../components/stats/charts/ProfitLineChart';
import { FaDownload, FaMoneyBillTransfer } from 'react-icons/fa6';
import { StatsMostPlayedCard } from '../components/stats/StatsMostPlayedCard';
import { StatsAdCard } from '../components/stats/StatsAdCard';
import ColorizedAmount from '../components/stats/ColorizedAmount';
import { GamePieChart } from '../components/stats/charts/GamesPieChart';
import MostBetsDayBarChart from '../components/stats/charts/MostBetsDayBarChart';
import { getGameName } from '../util/gameName';
import { toPng } from 'html-to-image';
import { Button } from 'flowbite-react';

import RootrackLogo from '/android-chrome-384x384.png';


export function PageStats() {
    const { withdrawals, deposits, bets } = useBettingData();
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(true);
    const [stats, setStats] = useState<Stats | null>(null);
    const [isDownloadVisible, setIsDownloadVisible] = useState(true);
    const statsRef = useRef(null);

    useEffect(() => {
        if (withdrawals.length !== 0 && deposits.length !== 0 && bets.length !== 0) {
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
                totalProfitChangeLast7Days: calculateProfitChangeTodayComparedTo7DaysAgo(deposits, withdrawals),

                // Biggest deposit
                biggestDeposit: deposits.reduce((biggest, deposit) => deposit.amount > biggest.amount ? deposit : biggest, deposits[0]),

                // Biggest withdrawal
                biggestWithdrawal: withdrawals.reduce((biggest, withdrawal) => withdrawal.totalValue > biggest.totalValue ? withdrawal : biggest, withdrawals[0]),

                // Wagered amount
                wagered: bets.reduce((acc, bet) => acc + bet.betAmount, 0),

                // Number of bets
                totalBets: bets.length,

                // Biggest win
                biggestWin: bets.reduce((biggest, bet) => bet.profit > biggest.profit ? bet : biggest, bets[0]),

                // Biggest multiplier
                biggestMultiplier: bets.reduce((biggest, bet) => bet.mult > biggest.mult ? bet : biggest, bets[0]),

                // Biggest loss
                biggestLoss: bets.reduce((biggest, bet) => bet.profit < biggest.profit ? bet : biggest, bets[0]),

                // Most played games
                playedGames: determineMostPlayedGames(bets),

                // Most played categories
                playedCategories: determineMostPlayedCategories(bets),

                // Most played providers
                playedProviders: determineMostPlayedProviders(bets),

                // Bets per weekday
                betsPerWeekday: determineBetsPerWeekday(bets),
            });
            setIsLoading(false);
        } else {
            navigate("/");
        }
    }, [withdrawals, deposits, bets, navigate]);


    if (isLoading || !stats) {
        return (
            <LoadingPage text='Calculating statistics' />
        );
    }

    const htmlToImageConvert = () => {
        if (statsRef.current) {
            setIsDownloadVisible(false);

            setTimeout(() => {
                toPng(statsRef.current!, { cacheBust: false })
                    .then((dataUrl) => {
                        const link = document.createElement("a");
                        link.download = "rootrack-stats.png";
                        link.href = dataUrl;
                        link.click();
                    })
                    .catch((err) => {
                        console.log(err);
                    })
                    .finally(() => {
                        setIsDownloadVisible(true);
                    });
            }, 0); // Small delay to ensure re-render before capturing
        }
    };

    return (
        <div className='w-full min-h-[100dvh] bg-slate-950 px-4 py-4 sm:px-10 sm:py-10 md:px-20 md:py-10 lg:px-28 lg:py-10 xl:px-72 xl:py-10 flex justify-center'>
            <div className='flex flex-col gap-5 items-center max-w-[1250px] p-2 bg-slate-950 rounded-xl' ref={statsRef}>
                <h1 className='text-3xl text-white flex items-center justify-between w-full h-16'>
                    <span>Your current Roobet stats</span>
                    <Button onClick={htmlToImageConvert} color={"warning"} className={isDownloadVisible ? '' : 'hidden'}>
                        <div className='flex items-center justify-center gap-2'>
                            <FaDownload /> <span>Download stats</span>
                        </div>
                    </Button>
                    <div className={`flex items-center justify-center gap-2 ${isDownloadVisible ? 'hidden' : ''}`}>
                        <img src={RootrackLogo} alt='Rootrack logo' className='w-6 h-6' /> <span className='text-sm'>Stats calculated on rootrack.me</span>
                    </div>
                </h1>
                <div className='flex w-full gap-5 max-w-7xl justify-between flex-col sm:flex-col md:flex-row'>
                    <StatsMoneyCard
                        title='Deposits'
                        icon={<PiHandDepositBold />}
                        value={stats.totalDepositsValue}
                        description={"in " + stats.totalDeposits + " deposits"}
                        explanation='The total value of all deposits you have made on Roobet'
                    />
                    <StatsMoneyCard
                        title='Profits'
                        icon={<FaDollarSign />}
                        value={stats.totalProfit}
                        description={
                            <>
                                <ColorizedAmount>{stats.totalProfitChangeLast7Days.toFixed(2)}</ColorizedAmount>
                                {" in the last 7 days"}
                            </>
                        }
                        isProfit
                        explanation='The total profits you have paid out from Roobet'
                    />
                    <StatsMoneyCard
                        title='Withdrawals'
                        icon={<PiHandWithdrawBold />}
                        value={stats.totalWithdrawalsValue}
                        description={"in " + stats.totalWithdrawals + " withdrawals"}
                        explanation='The total value of all withdrawals you have made on Roobet'
                    />
                </div>
                <ProfitLineChart />
                <StatsMostPlayedCard
                    mostPlayedGames={stats.playedGames.slice(0, 3)}
                    mostPlayedCategories={stats.playedCategories.slice(0, 3)}
                    mostPlayedProviders={stats.playedProviders.slice(0, 3)}
                />
                <div className='w-full gap-5 grid sm:grid-cols-2 md:grid-cols-3 '>
                    <div className='row-span-1 col-span-2 md:col-span-1'>
                        <StatsMoneyCard
                            title='Wagered'
                            icon={<FaMoneyBillTransfer />}
                            value={stats.wagered}
                            description={"in " + stats.totalBets + " bets"}
                            explanation='The total amount of money you have wagered on Roobet'
                        /></div>
                    <div className='row-span-3 col-span-2 w-full h-full'><GamePieChart games={stats.playedGames} /></div>
                    <div className='row-span-1 col-span-2 md:col-span-1 '><StatsAdCard /></div>
                    <div className='row-span-2 col-span-2 md:col-span-1'>
                        <MostBetsDayBarChart data={stats.betsPerWeekday} />
                    </div>
                    <div className='row-span-1 col-span-2 md:col-span-1'>
                        <StatsMoneyCard
                            title='Biggest win'
                            icon={<FaDollarSign />}
                            value={stats.biggestWin.profit}
                            description={`Won with a $${stats.biggestWin.betAmount} bet in ${getGameName(stats.biggestWin)}`}
                            isProfit
                            explanation='The biggest win you have had on Roobet'
                        />
                    </div>
                    <div className='row-span-1 col-span-2 md:col-span-1'>
                        <StatsMoneyCard
                            title='Biggest multiplier'
                            icon={<FaTimes />}
                            value={stats.biggestMultiplier.mult}
                            description={`Earned $${stats.biggestMultiplier.profit.toFixed(2)} from a $${stats.biggestMultiplier.betAmount} bet in ${getGameName(stats.biggestMultiplier)}`}
                            isMultiplier
                            explanation='The biggest multiplier you have had on Roobet'
                        />
                    </div>
                </div>
            </div>
        </div >
    );
}
