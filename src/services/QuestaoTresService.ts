import { DailyInvoiceInput, DailyInvoiceOutput } from "../interfaces/QuestaoTresInterface";
import { BadRequestError, NotFoundError } from "../models/ErrorStats";
import { DailyInvoice } from "../models/QuestaoTresModel";

export class QuestaoTresService {
    questaoTres = async (input: DailyInvoiceInput): Promise<DailyInvoiceOutput> => {
        try {
            if (!input) {
                throw new BadRequestError("Dados obrigatórios")
            }
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
            if (error instanceof NotFoundError) {
                throw new NotFoundError("Página não encontrada")
            }
            return {
                minValue: 0,
                maxValue: 0,
                aboveAverage: 0
            }
        }
    }
}
