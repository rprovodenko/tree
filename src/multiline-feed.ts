import { applyCommandToTree } from './apply-command-to-tree';
import { CommandType } from './parse-line/command';
import { parseInputLine } from './parse-line/parse-input-line';
import { Tree } from './tree/tree';

/**
 * Note: this is not used right now, but can be used to run commands stored e.g. in a file
 */

export function multilineFeed(tree: Tree, commands: string) {
    const lines = commands.split('\n');
    for (const line of lines) {
        const command = parseInputLine(line);
        if (command.type === CommandType.EXIT) {
            return;
        }
        applyCommandToTree(tree, command);
    }
}
