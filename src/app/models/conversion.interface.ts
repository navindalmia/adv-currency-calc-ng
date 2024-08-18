export interface Conversion {
    sourceCurrency: string;
    destinationCurrency: string;
    sourceAmount: number;
    destinationAmount: number;
    rate: number;
    date: string;
    rateSource: string;
    notes: string | null;
    [key: string]: string | number | null;
}
