import { FaChartPie } from 'react-icons/fa';
import { PieChart, Pie, Tooltip, TooltipProps, ResponsiveContainer } from 'recharts';
import { StatsContainer } from '../StatsContainer';

interface GamePieChartProps {
    games: { game: string, count: number }[];
}

export const GamePieChart = ({ games }: GamePieChartProps) => {
    return (
        <StatsContainer
            name='Bets per game'
            icon={<FaChartPie />}
        >
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        dataKey="count"
                        isAnimationActive={true}
                        data={games}
                        cx="50%"
                        cy="50%"
                        outerRadius={150}
                        fill="#8884d8"
                        label={(entry) => entry.game.length > 15 ? entry.game.substring(0, 12) + '..' : entry.game}
                        paddingAngle={10}
                    />
                    <Tooltip content={CustomTooltip} />
                </PieChart>
            </ResponsiveContainer>
        </StatsContainer>
    );
}

const CustomTooltip = ({ active, payload }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
        return (
            <div className="backdrop-blur-sm bg-white/10 px-3 py-2 rounded-xl text-white">
                <p className="label">{`${payload[0].payload.game}: ${payload[0].value} bets`}</p> {/* Display game name and value */}
            </div>
        );
    }
    return null;
};


