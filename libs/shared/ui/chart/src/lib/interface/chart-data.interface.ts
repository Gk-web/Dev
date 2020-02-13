export interface ChartData{
    date: string;
    open: number;
    close: number;
    high: number;
    low: number;
    volume: number;
    uOpen: number;
    uClose: number;
    uHigh: number;
    uLow: number;
    uVolume: number;
    change: number;
    changePercent: number;
    label: string;
    changeOverTime: number;
}

export interface Chart {
    title: string;
    type: string;
    data: any;
    columnNames: string[];
    options: any;
}
