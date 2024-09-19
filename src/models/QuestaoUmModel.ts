import { SomarParams } from "../interfaces/QuestaoUmIntarface";

export class SomarParameter implements SomarParams {
    indice: number
    soma: number
    k: number

    constructor(indice: number, soma: number, k: number) {
        this.indice = indice
        this.soma = soma
        this.k = k
    }
}