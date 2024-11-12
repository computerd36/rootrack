import { useRef, useState } from 'react';

// Context
import { useBettingData } from '../hooks/bettingDataContext';
import { useNavigate } from 'react-router-dom';

// Components
import { LoadingPage } from '../components/LoadingPage';
import { StatsMoneyCard } from '../components/stats/StatsMoneyCard';
import { ProfitLineChart } from '../components/stats/charts/ProfitLineChart';
import { StatsMostPlayedCard } from '../components/stats/StatsMostPlayedCard';
import ColorizedAmount from '../components/stats/ColorizedAmount';
import { GamePieChart } from '../components/stats/charts/GamesPieChart';
import MostBetsDayBarChart from '../components/stats/charts/MostBetsDayBarChart';
import { Button } from '../components/UI/Button';
import { StatsAdCard } from '../components/stats/StatsAdCard';

// Utils
import { getGameName } from '../util/gameName';

// Icons
import { PiHandDepositBold, PiHandWithdrawBold } from 'react-icons/pi';
import { FaCheck, FaDollarSign, FaDownload, FaMinus, FaPercentage, FaPlus, FaTimes, FaTrash } from 'react-icons/fa';
import { FaMoneyBillTransfer } from 'react-icons/fa6';


// Modules
import { WidthProvider, Responsive } from "react-grid-layout";
const ResponsiveReactGridLayout = WidthProvider(Responsive);
import { toPng } from 'html-to-image';
import { BsFillGrid1X2Fill } from 'react-icons/bs';
import { useBettingStats } from '../hooks/useBettingStats';
import { motion } from 'framer-motion';
import { TbMathAvg } from 'react-icons/tb';
import { defaultLayout, usePersistentLayout } from '../hooks/usePersistentLayout';
import { TiArrowBack } from 'react-icons/ti';



export function PageStats() {
    const navigate = useNavigate();

    const { withdrawals, deposits, bets, clearBettingData } = useBettingData();
    const { stats, isLoading } = useBettingStats(deposits, withdrawals, bets);
    const [layout, setLayout] = usePersistentLayout('userLayout', defaultLayout);

    // States
    const [isRearranging, setIsRearranging] = useState(false);
    const [isDownloadVisible, setIsDownloadVisible] = useState(true);
    const statsRef = useRef(null);


    // shake animation if the user is rearranging the cards
    const shakeVariants = {
        idle: { rotate: 0 },
        shakingSmallCard: {
            rotate: [-0.7, 0, 0.7, 0],
            transition: {
                duration: 0.3,
                repeat: Infinity,
            },
        },
        shakingBigCard: {
            rotate: [-0.5, 0, 0.5, 0],
            transition: {
                duration: 0.3,
                repeat: Infinity,
            },
        }
    };

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

    const resetStats = () => {
        //clears the betting data from the bettingdatacontext
        clearBettingData();
        //navigates back to the home page
        navigate('/');
    };

    if (isLoading || !stats) {
        return (
            <LoadingPage text='Calculating statistics' />
        );
    }

    return (
        <div className='py-24'>
            <div className='md:w-[730px] xl:w-[920px] 2xl:w-[1240px] mx-auto flex flex-col gap-6'>

                <h1 className='text-5xl text-white mx-5 md:mx-0'>Current Roobet stats of <span className='font-bold text-yellow-400'>{stats.userName}</span></h1>

                <div className='flex justify-between mx-5 md:mx-0'>
                    {isRearranging ?
                        <>
                            <Button
                                icon={<FaCheck />}
                                size='xl'
                                onClick={() => setIsRearranging(!isRearranging)}
                                ariaLabel='Confirm'
                            >Confirm</Button>
                            <Button
                                icon={<TiArrowBack />}
                                size='xl'
                                onClick={() => setLayout(defaultLayout)}
                                ariaLabel='Reset Layout'
                            >Reset Layout</Button>
                        </>
                        :
                        <Button
                            icon={<BsFillGrid1X2Fill />}
                            size='xl'
                            onClick={() => setIsRearranging(!isRearranging)}
                            ariaLabel='Rearrange stats'
                        >Rearrange</Button>
                    }
                    <div className={`flex gap-4 ${(isRearranging || !isDownloadVisible) ? 'hidden' : ''}`}>
                        <Button
                            icon={<FaTrash />}
                            size='xl'
                            onClick={resetStats}
                            ariaLabel='Delete stats'
                        >Delete</Button>

                        <Button
                            icon={<FaDownload />}
                            size='xl'
                            onClick={htmlToImageConvert}
                            ariaLabel='Download stats'
                        >Download</Button>
                    </div>
                </div>
            </div>

            <div className='md:w-[770px] xl:w-[960px] 2xl:w-[1280px] mx-auto relative' >
                <div ref={statsRef}>
                    <ResponsiveReactGridLayout
                        className="layout"
                        layouts={{ lg: layout }}
                        cols={{ lg: 9, md: 9, sm: 9, xs: 3, xxs: 3 }}
                        rowHeight={180}
                        margin={[20, 20]}
                        useCSSTransforms={false}
                        isDraggable={isRearranging}
                        onLayoutChange={(layout) => {
                            if (isRearranging) setLayout(layout);
                        }}
                    >
                        <motion.div
                            key={'cardDeposits'}
                            variants={shakeVariants}
                            animate={isRearranging ? 'shakingSmallCard' : 'idle'}
                        >
                            <StatsMoneyCard
                                title='Deposits'
                                icon={<PiHandDepositBold />}
                                value={stats.totalDepositsValue}
                                type='money'
                                description={"in " + stats.totalDeposits + " deposits"}
                                explanation='The total value of all deposits you have made on Roobet'
                            />
                        </motion.div>

                        <motion.div
                            key='cardProfits'
                            variants={shakeVariants}
                            animate={isRearranging ? 'shakingSmallCard' : 'idle'}
                        >
                            <StatsMoneyCard
                                title='Profits'
                                icon={<FaDollarSign />}
                                value={stats.totalProfit}
                                type='money'
                                description={
                                    <>
                                        <ColorizedAmount>{stats.totalProfitChangeLast7Days.toFixed(2)}</ColorizedAmount>
                                        {" in the last 7 days"}
                                    </>
                                }
                                isProfit
                                explanation='The total profits you have paid out from Roobet'
                            />
                        </motion.div>

                        <motion.div
                            key='cardWithdrawals'
                            variants={shakeVariants}
                            animate={isRearranging ? 'shakingSmallCard' : 'idle'}
                        >
                            <StatsMoneyCard
                                title='Withdrawals'
                                icon={<PiHandWithdrawBold />}
                                value={stats.totalWithdrawalsValue}
                                type='money'
                                description={"in " + stats.totalWithdrawals + " withdrawals"}
                                explanation='The total value of all withdrawals you have made on Roobet'
                            />
                        </motion.div>

                        <motion.div
                            key='cardChartProfitLine'
                            variants={shakeVariants}
                            animate={isRearranging ? 'shakingBigCard' : 'idle'}
                        >
                            <ProfitLineChart />
                        </motion.div>

                        <motion.div
                            key='cardMostPlayed'
                            variants={shakeVariants}
                            animate={isRearranging ? 'shakingBigCard' : 'idle'}
                        >
                            <StatsMostPlayedCard
                                mostPlayedGames={stats.playedGames.slice(0, 4)}
                                mostPlayedCategories={stats.playedCategories.slice(0, 4)}
                                mostPlayedProviders={stats.playedProviders.slice(0, 4)}
                            />
                        </motion.div>

                        <motion.div
                            key='cardWagered'
                            variants={shakeVariants}
                            animate={isRearranging ? 'shakingSmallCard' : 'idle'}
                        >
                            <StatsMoneyCard
                                title='Wagered'
                                icon={<FaMoneyBillTransfer />}
                                value={stats.wagered}
                                type='money'
                                description={"in " + stats.totalBets + " bets"}
                                explanation='The total amount of money you have wagered on Roobet'
                            />
                        </motion.div>

                        <motion.div
                            key='cardGamesPie'
                            variants={shakeVariants}
                            animate={isRearranging ? 'shakingBigCard' : 'idle'}
                        >
                            <GamePieChart games={stats.playedGames} />
                        </motion.div>

                        <motion.div
                            key='cardBetsPerWeekday'
                            variants={shakeVariants}
                            animate={isRearranging ? 'shakingSmallCard' : 'idle'}
                        >
                            <MostBetsDayBarChart data={stats.betsPerWeekday} />
                        </motion.div>

                        <motion.div
                            key='cardAd'
                            variants={shakeVariants}
                            animate={isRearranging ? 'shakingSmallCard' : 'idle'}
                        >
                            <StatsAdCard />
                        </motion.div>

                        <motion.div
                            key='cardBiggestWin'
                            variants={shakeVariants}
                            animate={isRearranging ? 'shakingSmallCard' : 'idle'}
                        >
                            <StatsMoneyCard
                                title='Biggest win'
                                icon={<FaPlus />}
                                value={stats.biggestWin.profit}
                                type='money'
                                description={`Won with a $${stats.biggestWin.betAmount} bet in ${getGameName(stats.biggestWin)}`}
                                isProfit
                                explanation='The biggest win you have had on Roobet'
                            />
                        </motion.div>

                        <motion.div
                            key='cardBiggestMultiplier'
                            variants={shakeVariants}
                            animate={isRearranging ? 'shakingSmallCard' : 'idle'}
                        >
                            <StatsMoneyCard
                                title='Biggest multiplier'
                                icon={<FaTimes />}
                                value={stats.biggestMultiplier.mult}
                                type='multiplier'
                                description={`Earned $${stats.biggestMultiplier.profit.toFixed(2)} from a $${stats.biggestMultiplier.betAmount} bet in ${getGameName(stats.biggestMultiplier)}`}
                                explanation='The biggest multiplier you have had on Roobet'
                            />
                        </motion.div>

                        <motion.div
                            key='cardOverallRTP'
                            variants={shakeVariants}
                            animate={isRearranging ? 'shakingSmallCard' : 'idle'}
                        >
                            <StatsMoneyCard
                                title='Overall RTP'
                                icon={<FaPercentage />}
                                value={stats.overallRTP}
                                type='percentage'
                                description={"Overall return to player percentage"}
                                explanation='The average return to player percentage you have had on Roobet per bet (not per dollar)'
                            />
                        </motion.div>

                        <motion.div
                            key='cardAverageBet'
                            variants={shakeVariants}
                            animate={isRearranging ? 'shakingSmallCard' : 'idle'}
                        >
                            <StatsMoneyCard
                                title='Average bet'
                                icon={<TbMathAvg />}
                                value={stats.averageBet}
                                type='money'
                                description={"average bet size"}
                                explanation='The average amount you have bet on Roobet'
                            />
                        </motion.div>

                        <motion.div
                            key='cardBiggestLoss'
                            variants={shakeVariants}
                            animate={isRearranging ? 'shakingSmallCard' : 'idle'}
                        >
                            <StatsMoneyCard
                                title='Biggest bet lost'
                                icon={<FaMinus />}
                                value={stats.biggestLoss.profit}
                                type='money'
                                description={`in ${getGameName(stats.biggestLoss)}`}
                                isProfit
                                explanation='The biggest loss you have had on a single bet on Roobet'
                            />
                        </motion.div>


                    </ResponsiveReactGridLayout >
                </div>
            </div>
        </div >
    );
}