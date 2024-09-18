import { Request, Response } from "express";
import { InternalServerError, NotFoundError } from "../models/ErrorStats";


export const server = async (req: Request, res: Response) => {
    try {
        res.json({
            message: "Servidor rodando!"
        })

    } catch (error) {
        if (error instanceof NotFoundError) {
            return res.status(error.statusCode).json({
                mensagem: error.message
            })
        } else {
            const internalError = new InternalServerError("Erro interno do servidor")
            res.status(internalError.statusCode).json({
                mensagem: internalError.message
            })
        }
    }
}