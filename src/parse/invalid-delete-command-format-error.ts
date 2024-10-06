export class InvalidDeleteCommandFormatError extends Error {

    constructor(message: string) {
        super(`Invalid DELETE command format. Correct format: DELETE <target>. Recieved: DELETE ${message}`)
    }
}
