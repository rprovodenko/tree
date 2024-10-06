export class InvalidExitCommandFormatError extends Error {
    constructor(message: string) {
        super(
            `Invalid EXIT command format. Correct format: EXIT. Recieved: EXIT ${message}`
        );
    }
}
