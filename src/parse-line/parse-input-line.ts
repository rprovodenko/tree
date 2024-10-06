import { CommandType, CreateCommand, DeleteCommand, ExitCommand, ListCommand, MoveCommand } from "./command";
import { InvalidCommandTypeError } from "./invalid-command-type-error";
import { InvalidCreateCommandFormatError } from "./invalid-create-command-format-error";
import { InvalidListCommandFormatError } from "./invalid-list-command-format-error";
import { InvalidMoveCommandFormatError } from "./invalid-move-command-format-error";

function matchCommand(commandString: string) {
    if (commandString === CommandType.CREATE) {
        return CommandType.CREATE
    }
    if (commandString === CommandType.DELETE) {
        return CommandType.DELETE
    }
    if (commandString === CommandType.LIST) {
        return CommandType.LIST;
    }
    if (commandString === CommandType.MOVE) {
        return CommandType.MOVE
    }

    throw new InvalidCommandTypeError(commandString)

}

function parseCreateCommand(args: string[]): CreateCommand {
    if (args.length !== 1) {
        throw new InvalidCreateCommandFormatError(`${args.join(" ")}`)
    }

    return {
        type: CommandType.CREATE,
        target: args[0]
    }
}


function parseMoveCommand(args: string[]): MoveCommand {
    if (args.length !== 2) {
        throw new InvalidMoveCommandFormatError(`${args.join(" ")}`)
    }

    return {
        type: CommandType.MOVE,
        source: args[0],
        target: args[1]
    }
}


function parseListCommand(args: string[]): ListCommand {
    if (args.length !== 0) {
        throw new InvalidListCommandFormatError(`${args.join(" ")}`)
    }

    return {
        type: CommandType.LIST,
    }
}

function parseDeleteCommand(args: string[]): DeleteCommand {
    if (args.length !== 1) {
        throw new InvalidListCommandFormatError(`${args.join(" ")}`)
    }

    return {
        type: CommandType.DELETE,
        target: args[0]
    }
}


function parseExitCommand(args: string[]): ExitCommand {
    if (args.length !== 0) {
        throw new InvalidListCommandFormatError(`${args.join(" ")}`)
    }

    return {
        type: CommandType.EXIT,
    }
}

export function parseInputLine(inputLine: string) {

    const [commandTypeString, ...args] = inputLine.replace(/\s+/g, ' ').trim().split(" ");

    const commandType = matchCommand(commandTypeString);

    if (commandType === CommandType.CREATE) {
        return parseCreateCommand(args);
    }

    if (commandType === CommandType.MOVE) {
        return parseMoveCommand(args);
    }

    if (commandType === CommandType.LIST) {
        return parseListCommand(args);
    }

    if (commandType === CommandType.DELETE) {
        return parseDeleteCommand(args);
    }

    if (commandType === CommandType.EXIT) {
        return parseExitCommand(args);
    }

    throw new Error(`Internal error. Unknowm command type: ${commandType}`)
}
