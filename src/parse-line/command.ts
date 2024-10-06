export enum CommandType {
    CREATE = "CREATE",
    LIST = "LIST",
    MOVE = "MOVE",
    DELETE = "DELETE",
    EXIT = "EXIT"
}

export type CreateCommand = {
    type: CommandType.CREATE
    target: string;
}

export type MoveCommand = {
    type: CommandType.MOVE
    source: string;
    target: string;
}

export type ListCommand =  {
    type: CommandType.LIST
}

export type DeleteCommand = {
    type: CommandType.DELETE
    target: string;
}


export type ExitCommand = {
    type: CommandType.EXIT
}

export type TreeCommand = CreateCommand | MoveCommand | ListCommand | DeleteCommand
