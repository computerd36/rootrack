import { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, TooltipProps, ResponsiveContainer, ReferenceLine } from 'recharts';
import { useBettingData } from '../../../hooks/bettingDataContext';
import { format, parseISO } from 'date-fns';
import { FaChartLine } from 'react-icons/fa';
import ColorizedAmount from '../ColorizedAmount';
import { StatsContainer } from '../StatsContainer';

interface ProfitDataPoint {
    date: string;
    profit: number;
}

export function ProfitLineChart() {
    const { deposits, withdrawals } = useBettingData();
    const [profitData, setProfitData] = useState<ProfitDataPoint[]>([]);

    useEffect(() => {
        if (deposits.length !== 0 || withdrawals.length !== 0) {
            // Combine and sort deposits and withdrawals by date
            const combinedData = [...deposits, ...withdrawals]
                .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());

            // Initialize an empty array to store profit data
            const profitByDay: { [key: string]: number } = {};
            let cumulativeProfit = 0;

            // Process each transaction (deposit or withdrawal)
            combinedData.forEach((item) => {
                const date = format(new Date(item.createdAt), 'yyyy-MM-dd');
                if (!profitByDay[date]) {
                    profitByDay[date] = cumulativeProfit; // Start with previous day's profit
                }

                if ('amount' in item) {
                    // This is a deposit -> decrease profit
                    cumulativeProfit -= item.amount;
                } else if ('totalValue' in item) {
                    // This is a withdrawal -> increase profit
                    cumulativeProfit += item.totalValue;
                }

                // Update the profit for that day
                profitByDay[date] = cumulativeProfit;
            });

            // Convert the object into an array of { date, profit } for the chart
            const profitArray = Object.keys(profitByDay).map((date) => ({
                date,
                profit: profitByDay[date],
            }));

            setProfitData(profitArray);
        }
    }, [deposits, withdrawals]);

    if (profitData.length === 0) {
        return <p>No profit data available.</p>;
    }

    return (
        <StatsContainer name="Profit over time" icon={<FaChartLine />}>
            <ResponsiveContainer width="100%" height="100%" >
                <LineChart
                    data={profitData}
                    margin={{ top: 5, right: 10, left: -20, bottom: 5 }}
                >
                    <XAxis stroke='#e5edff' dataKey="date" tickFormatter={(tick) => format(parseISO(tick), 'MM-dd')} />
                    <YAxis stroke='#e5edff' tickFormatter={(tick) => `$${tick}`} />
                    <ReferenceLine y={0} stroke="red" strokeDasharray="3 3" />
                    <Tooltip content={CustomTooltip} />

                    <Line type="monotone" dataKey="profit" stroke="#8884d8" activeDot={{ r: 8 }} />
                </LineChart>
            </ResponsiveContainer>
        </StatsContainer>
    );
}




const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
        return (
            <div className="backdrop-blur-sm bg-white/10 px-3 py-2 rounded-xl text-white">
                <p className="label">{label} <ColorizedAmount>{payload[0].value!.toFixed(2)}</ColorizedAmount></p>
            </div>
        );
    }
    return null;
};