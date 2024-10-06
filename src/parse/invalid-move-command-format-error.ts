export class InvalidMoveCommandFormatError extends Error {

    constructor(message: string) {
        super(`Invalid MOVE command format. Correct format: MOVE <source> <target>. Recieved: MOVE ${message}`)
    }
}
