export class InvalidCreateCommandFormatError extends Error {
    constructor(message: string) {
        super(
            `Invalid CREATE command format. Correct format: CREATE <target>. Recieved: CREATE ${message}`
        );
    }
}
