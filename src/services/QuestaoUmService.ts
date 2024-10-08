import { BadRequestError, NotFoundError } from "../models/ErrorStats";
import { SomarParameter } from "../models/QuestaoUmModel";

export default class Services {
    async questaoUm(params: SomarParameter) {
        try {
            while (params.k < params.indice) {
                params.k += 1
                params.soma += params.k
            }
            return params.soma
        } 
        catch (error) {
            if (error instanceof NotFoundError || error instanceof BadRequestError) {
                return error.statusCode, error.message
            }
        }
    }
}
