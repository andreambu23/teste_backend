import { Request, Response } from "express";
import { QuestaoQuatroService } from "../services/QuestaoQuatroService";
import { InternalServerError } from "../models/ErrorStats";

export class QuestaoQuatroController {
    private questaoQuatroService: QuestaoQuatroService

    constructor() {
        this.questaoQuatroService = new QuestaoQuatroService();
    }

    questaoQuatro = async (req: Request, res: Response) => {
        try {
            const result = await this.questaoQuatroService.questaoQuatro()
            res.status(200).json(result)
        } catch (error) {
            if (error instanceof InternalServerError) {
                return res.status(error.statusCode).json(error.message)
            }
        }
    }
}