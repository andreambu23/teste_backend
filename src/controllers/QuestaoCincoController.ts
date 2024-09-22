import { Request, Response } from "express";
import { QuestaoCincoService } from "../services/QuestaoCincoService";
import { InternalServerError } from "../models/ErrorStats";

export class QuestaoCincoController {
    private questaoCincoService: QuestaoCincoService

    constructor() {
        this.questaoCincoService = new QuestaoCincoService()
    }

    questaoCinco = async (req: Request, res: Response) => {
        try {
            const result = await this.questaoCincoService.questaoCinco()
            res.status(200).json(result)
        } catch (error) {
            if (error instanceof InternalServerError) {
                return res.status(error.statusCode).json(error.message)
            }
        }
    }
}