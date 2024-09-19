import { Sequence } from "../interfaces/QuestaoDoisInterface";
import { BadRequestError, NotFoundError } from "../models/ErrorStats";
import { SequenceOutput } from "../models/QuestaoDoisModel";

export class QuestaoDoisService {
    async questaoDois(params: Sequence) {
        try {
            if (!params) {
                throw new BadRequestError('Necessário informar os dados no corpo da requisição.');
            }

            let nextValue: number;
            switch (params.id) {
                case 'a':
                    nextValue = params.values[params.values.length - 1] + 2;
                    break;
                case 'b':
                    nextValue = params.values[params.values.length - 1] * 2;
                    break;
                case 'c':
                    const nextIndexC = params.values.length;
                    nextValue = nextIndexC * nextIndexC;
                    break;
                case 'd':
                    const nextIndexD = params.values.length + 2;
                    nextValue = nextIndexD * nextIndexD;
                    break;
                case 'e':
                    const size = params.values.length;
                    nextValue = params.values[size - 1] + params.values[size - 2];
                    break;
                case 'f':
                    nextValue = params.values[params.values.length - 1] + 1;
                    break;
                default:
                    throw new BadRequestError('Invalid information');
            }
            return new SequenceOutput(params.id, nextValue);
        } catch (error) {
            if (error instanceof NotFoundError) {
                return error.message
            }
        }
    }
}