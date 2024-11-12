import { useEffect, useState } from "react";

interface LayoutItem {
    i: string;
    x: number;
    y: number;
    w: number;
    h: number;
}

export function usePersistentLayout(key: string, defaultLayout: LayoutItem[]): [LayoutItem[], (layout: LayoutItem[]) => void] {
    const [layout, setLayout] = useState<LayoutItem[]>(() => {
        const savedLayout = localStorage.getItem(key);
        return savedLayout ? JSON.parse(savedLayout) : defaultLayout;
    });

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(layout));
    }, [layout, key]);

    return [layout, setLayout];
}

export const defaultLayout = [
    { i: 'cardDeposits', x: 0, y: 0, w: 3, h: 1 },
    { i: 'cardProfits', x: 3, y: 0, w: 3, h: 1 },
    { i: 'cardWithdrawals', x: 6, y: 0, w: 3, h: 1 },
    { i: 'cardChartProfitLine', x: 0, y: 1, w: 9, h: 3 },
    { i: 'cardMostPlayed', x: 0, y: 3, w: 9, h: 2 },
    { i: 'cardWagered', x: 0, y: 7, w: 3, h: 1 },
    { i: 'cardGamesPie', x: 3, y: 7, w: 6, h: 3 },
    { i: 'cardBetsPerWeekday', x: 0, y: 8, w: 3, h: 2 },
    { i: 'cardAd', x: 0, y: 9, w: 3, h: 1 },
    { i: 'cardBiggestWin', x: 3, y: 9, w: 3, h: 1 },
    { i: 'cardBiggestMultiplier', x: 6, y: 9, w: 3, h: 1 },
    { i: 'cardOverallRTP', x: 0, y: 10, w: 3, h: 1 },
    { i: 'cardAverageBet', x: 3, y: 10, w: 3, h: 1 },
    { i: 'cardBiggestLoss', x: 6, y: 10, w: 3, h: 1 },
];