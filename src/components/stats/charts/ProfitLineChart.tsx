import { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { useBettingData } from '../../../context/bettingDataContext';
import { format, parseISO } from 'date-fns';

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

    // Custom tick formatter to hide first and last label
    const renderCustomAxisTick = ({ x, y, payload, index }: any) => {
        if (index === 0) {
            return (
                <text x={x} y={y + 10} fill="#e5edff" textAnchor="start">
                    {format(parseISO(payload.value), 'MMM dd')}
                </text>
            )
        }

        if (index === profitData.length - 1) {
            return (
                <text x={x} y={y + 10} fill="#e5edff" textAnchor="end">
                    {format(parseISO(payload.value), 'MMM dd')}
                </text>
            )
        }

        return (
            <text x={x} y={y + 10} fill="#e5edff" textAnchor="middle">
                {format(parseISO(payload.value), 'MMM dd')}
            </text>
        );
    };

    if (profitData.length === 0) {
        return <p>No profit data available.</p>;
    }

    return (
        <ResponsiveContainer width="100%" height={400} className="bg-indigo-900 rounded-xl">
            <LineChart
                data={profitData}
                margin={{ top: 30, right: 30, left: 20, bottom: 30 }}
            >
                <XAxis dataKey="date" tickFormatter={(tick) => format(parseISO(tick), 'MMM dd')} tick={renderCustomAxisTick} />
                <YAxis stroke='#e5edff' tickFormatter={(tick) => `${tick} $`} />
                <ReferenceLine y={0} stroke="red" strokeDasharray="3 3" />
                <Tooltip />
                <Line type="monotone" dataKey="profit" stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart>
        </ResponsiveContainer>
    );
}
