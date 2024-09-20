import { DailyInvoiceInput, DailyInvoiceOutput } from "../interfaces/QuestaoTresInterface";
import { DailyInvoice } from "../models/QuestaoTresModel";

export class QuestaoTresService {
    async calculateDailyInvoicing(input: DailyInvoiceInput): Promise<DailyInvoiceOutput> {
        try {
            const values: number[] = input.values;
            const filteredValues = values.filter((value: number) => value > 0);
            const sumValues = filteredValues.reduce((acc: number, current: number) => acc + current, 0);
            const annualAverage = sumValues / filteredValues.length;

            const minValue = Math.min(...filteredValues);
            const maxValue = Math.max(...filteredValues);
            const aboveAverage = filteredValues.filter((value: number) => value > annualAverage).length;

            const result = {
                minValue,
                maxValue,
                aboveAverage,
            }

            return new DailyInvoice(result)
        } catch (error) {
            return {
                minValue: 0,
                maxValue: 0,
                aboveAverage: 0
            }
        }
    }
}