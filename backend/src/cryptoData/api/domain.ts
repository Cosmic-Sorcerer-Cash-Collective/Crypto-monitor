export type typeMACD = {
    macd: number;
    signal: number;
    histogram: number;
}

export interface CryptoDataResponse {
    pair: string;
    data: {
        lastPrice: number;
        volume: number;
        high: number;
        low: number;
        change: number;
        changePercent: number;
        timestamp: number;
    };
    technicalAnalysis: {
        sma: number;
        rsi: number;
        macd: typeMACD;
        fibonacci: {
            support: number;
            resistance: number;
        };
    };
}

export interface CryptoData {
    getCryptoSpecificData(pair: string): Promise<CryptoDataResponse>
    getCryptoListData(): Promise<CryptoDataResponse[]>
}