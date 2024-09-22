import { QueryOutput } from "../interfaces/QuestaoQuatroInterface"

export class Output {
    id: number
    name: string
    phoneNumbers: string[]

    constructor(params: QueryOutput) {
        this.id = params.id
        this.name = params.name
        this.phoneNumbers = params.phoneNumbers
    }
}