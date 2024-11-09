import { IoCalendar } from "react-icons/io5";
import { Bar, BarChart, ResponsiveContainer, XAxis, TooltipProps, Tooltip } from "recharts";
import { StatsContainer } from "../StatsContainer";


interface MostBetsDayBarChartProps {
    data: { weekday: string, count: number }[];
}

export default function MostBetsDayBarChart(props: Readonly<MostBetsDayBarChartProps>) {


    return (
        <StatsContainer
            name='Bets per weekday'
            icon={<IoCalendar />}
        >
            <ResponsiveContainer width="100%" height="100%">
                <BarChart width={150} height={40} data={props.data}>
                    <Bar dataKey="count" fill="#8884d8" />
                    <Tooltip content={CustomTooltip} cursor={{ display: "none" }} />
                    <XAxis dataKey="weekday" stroke="#E0E7FF" />
                </BarChart>
            </ResponsiveContainer>
        </StatsContainer>
    );
}

const CustomTooltip = ({ active, payload }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
        return (
            <div className="backdrop-blur-sm bg-white/10 px-3 py-2 rounded-xl text-white">
                <p className="label">{`${payload[0].payload.weekday}: ${payload[0].value} bets`}</p> {/* Display weekday and value */}
            </div>
        );
    }
    return null;
};