import { Request, Response } from "express";
import { QuestaoTresService } from "../services/QuestaoTresServie";
import { DailyInvoiceInput, DailyInvoiceOutput } from "../interfaces/QuestaoTresInterface";

export default class DailyInvoiceController {
    private questaoTresService: QuestaoTresService

    constructor() {
        this.questaoTresService = new QuestaoTresService()
    }

    async DailyInvoice(req: Request, res: Response) {
        try {
            const input: DailyInvoiceInput = req.body
            const result: DailyInvoiceOutput = await this.questaoTresService.calculateDailyInvoicing(input)
            return res.status(200).json(result)
        } catch (error) {

        }
    }
}