import { CommandType } from './command';

export class InvalidCommandTypeError extends Error {
    constructor(message: string) {
        super(
            `Unknown command: ${message}. Supported commands: [${Object.keys(
                CommandType
            ).join(', ')}]`
        );
    }
}
