import { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { useBettingData } from '../../../context/bettingDataContext';
import { format, parseISO } from 'date-fns';
import { FaChartLine } from 'react-icons/fa';
import { Card } from 'flowbite-react';

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
        <Card className="bg-indigo-900 grow w-full">
            <h2 className='flex items-center gap-2 text-indigo-300'><FaChartLine /> Profit Performance</h2>
            <ResponsiveContainer width="100%" height={400}>
                <LineChart
                    data={profitData}
                    margin={{ right: 30, left: 20}}
                    
                >
                    <XAxis stroke='#e5edff' dataKey="date" tickFormatter={(tick) => format(parseISO(tick), 'dd.MM')} />
                    <YAxis stroke='#e5edff' tickFormatter={(tick) => `${tick} $`} />
                    <ReferenceLine y={0} stroke="red" strokeDasharray="3 3" />
                    <Tooltip />
                    <Line type="monotone" dataKey="profit" stroke="#8884d8" activeDot={{ r: 8 }} />
                </LineChart>
            </ResponsiveContainer>
        </Card>
    );
}
