import { Command, CommandType } from "./parse-line/command";
import { parseInputLine } from "./parse-line/parse-input-line";
import { Tree } from "./tree/tree";

/**
 * TODO:
 * - list
 * - errors
 */

function applyCommandToTree(tree: Tree, command: Command) {
    if (command.type === CommandType.CREATE) {
        tree.addNode(command.target);
        return;
    }
    if (command.type === CommandType.DELETE) {
        tree.removeNode(command.target);
        return;
    }
    if (command.type === CommandType.MOVE) {
        tree.moveNode(command.source, command.target)
        return;
    }
}


export function multilineFeed(tree: Tree, commands: string) {
    const lines = commands.split("\n");
    for (const line of lines) {
        const command = parseInputLine(line);
        applyCommandToTree(tree, command);
    }
}
