export interface DailyInvoiceInput{
    values: number[]
}

export interface DailyInvoiceOutput{
    minValue: number;
    maxValue: number;
    aboveAverage: number
}