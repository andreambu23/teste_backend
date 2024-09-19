import { Sequence } from "../interfaces/QuestaoDoisInterface"

export class SequenceInput {
    id: string;
    values: number[];

    constructor(params: Sequence) {
        this.id = params.id;
        this.values = params.values;
    }
}

export class SequenceOutput {
    id: string
    nextValue: number

    constructor(id: string, nextValue: number) {
        this.id = id
        this.nextValue = nextValue
    }
}