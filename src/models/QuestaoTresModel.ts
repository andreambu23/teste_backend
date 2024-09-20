import { DailyInvoiceOutput } from "../interfaces/QuestaoTresInterface"

export class DailyInvoice {
    minValue: number
    maxValue: number
    aboveAverage: number

    constructor(params: DailyInvoiceOutput) {
        this.minValue = params.minValue
        this.maxValue = params.maxValue
        this.aboveAverage = params.aboveAverage
    }
}