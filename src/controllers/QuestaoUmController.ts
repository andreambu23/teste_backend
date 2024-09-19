import { Request, Response } from "express"
import Services from "../services/QuestaoUmService"
import { SomarParameter } from "../models/QuestaoUmModel"
import { InternalServerError } from "../models/ErrorStats"


export default class QuestaoUmController {
    private services: Services

    constructor() {
        this.services = new Services()
    }

    questaoUm = async (req: Request, res: Response) => {
        try {
            const numbers = new SomarParameter(12, 0, 1)
            const resultado = await this.services.questaoUm(numbers)
            return res.status(200).json({ resultado })
        } catch (error) {
            if (error instanceof InternalServerError) {
                throw new InternalServerError(error.message)
            }
        }
    }
}