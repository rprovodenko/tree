export class InvalidListCommandFormatError extends Error {
    constructor(message: string) {
        super(
            `Invalid LIST command format. Correct format: LIST. Recieved: LIST ${message}`
        );
    }
}
