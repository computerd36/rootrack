import { Card } from "flowbite-react";
import { IoCalendar } from "react-icons/io5";
import { Bar, BarChart, ResponsiveContainer, XAxis, TooltipProps, Tooltip } from "recharts";


interface MostBetsDayBarChartProps {
    data: { weekday: string, count: number }[];
}

export default function MostBetsDayBarChart(props: MostBetsDayBarChartProps) {


    return (
        <Card className="bg-indigo-900 h-full w-full">
            <h2 className='flex items-center gap-2 text-indigo-300'><IoCalendar />Bets per weekday</h2>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart width={150} height={40} data={props.data}>
                    <Bar dataKey="count" fill="#8884d8" />
                    <Tooltip content={CustomTooltip} cursor={{ display: "none" }} />
                    <XAxis dataKey="weekday" />
                </BarChart>
            </ResponsiveContainer>
        </Card>
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