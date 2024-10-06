export enum CommandType {
    CREATE = "CREATE",
    LIST = "LIST",
    MOVE = "MOVE",
    DELETE = "DELETE"
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
    target: string;
}

export type DeleteCommand = {
    type: CommandType.DELETE
    target: string;
}

export type Command = CreateCommand | MoveCommand | ListCommand | DeleteCommand
