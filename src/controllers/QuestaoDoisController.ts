import { Request, Response } from "express";
import { QuestaoDoisService } from "../services/QuestaoDoisService";
import { InternalServerError } from "../models/ErrorStats";

export default class QuestaoDoisController {
    private questaoDoisService: QuestaoDoisService

    constructor() {
        this.questaoDoisService = new QuestaoDoisService
    }

    questaoDois = async (req: Request, res: Response) => {
        try {
            const params = req.body
            const result = await this.questaoDoisService.questaoDois(params)
            return res.status(200).json(result)
        } catch (error) {
            if (error instanceof InternalServerError) {
                return res.status(error.statusCode).json(error.message)
            }
        }
    }
}