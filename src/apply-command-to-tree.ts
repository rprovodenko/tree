import { CommandType, TreeCommand } from './parse-line/command';
import { Tree } from './tree/tree';

export function applyCommandToTree(tree: Tree, command: TreeCommand) {
    if (command.type === CommandType.CREATE) {
        tree.addNode(command.target);
        return;
    }
    if (command.type === CommandType.DELETE) {
        tree.removeNode(command.target);
        return;
    }
    if (command.type === CommandType.MOVE) {
        tree.moveNode(command.source, command.target);
        return;
    }
    if (command.type === CommandType.LIST) {
        return tree.list();
    }
}
