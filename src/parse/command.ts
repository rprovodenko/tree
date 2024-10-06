export enum CommandType {
    CREATE = "CREATE",
    LIST = "LIST",
    MOVE = "MOVE",
    DELETE = "DELETE"
}

export interface Command {
    type: CommandType 
}

export type CreateCommand = Command & {
    target: string;
}

export type MoveCommand = Command & {
    source: string;
    target: string;
}
