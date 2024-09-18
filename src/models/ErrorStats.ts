export class InternalServerError extends Error {
    readonly statusCode: number

    constructor(mensagem: string) {
        super(mensagem)
        this.statusCode = 500
    }
}

export class NotFoundError extends Error {
    readonly statusCode: number

    constructor(mensagem: string) {
        super(mensagem)
        this.statusCode = 404
    }
}

export class BadRequestError extends Error {
    readonly statusCode: number

    constructor(mensagem: string) {
        super(mensagem)
        this.statusCode = 400
    }
}