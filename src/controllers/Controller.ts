import { Request, Response } from "express"
import Services from "../services/Services"
import { SomarParameter } from "../models/SomarParameter"
import { InternalServerError } from "../models/ErrorStats"


export default class Controller {
    private services: Services

    constructor() {
        this.services = new Services()
    }

    somar = async (req: Request, res: Response) => {
        try {
            const numbers = new SomarParameter(12, 0, 1)
            const resultado = await this.services.somar(numbers)
            return res.status(200).json({ resultado })
        } catch (error) {
            if (error instanceof InternalServerError) {
                throw new InternalServerError(error.message)
            }
        }
    }
}