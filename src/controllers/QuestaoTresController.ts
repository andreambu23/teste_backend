import { Request, Response } from "express";
import { QuestaoTresService } from "../services/QuestaoTresService";
import { DailyInvoiceInput, DailyInvoiceOutput } from "../interfaces/QuestaoTresInterface";
import { InternalServerError } from "../models/ErrorStats";

export default class QuestaoTresController {
    private questaoTresService: QuestaoTresService

    constructor() {
        this.questaoTresService = new QuestaoTresService()
    }

    questaoTres = async (req: Request, res: Response) => {
        try {
            const input: DailyInvoiceInput = req.body
            const result: DailyInvoiceOutput = await this.questaoTresService.questaoTres(input)
            return res.status(200).json(result)
        } catch (error) {
            if(error instanceof InternalServerError){
                res.status(error.statusCode).json(error.message)
            }
        }
    }
}