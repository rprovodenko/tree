import { CommandType, CreateCommand, MoveCommand } from "./command";
import { InvalidCreateCommandFormatError } from "./invalid-create-command-format-error";
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

export function parseInputLine(inputLine: string) {

    
    const [commandTypeString, ...args] = inputLine.trim().split(" ");

    const commandType = matchCommand(commandTypeString);

    if (commandType === CommandType.CREATE) {
        return parseCreateCommand(args);
    }

    if (commandType === CommandType.MOVE) {
        return parseMoveCommand(args);
    }


}
