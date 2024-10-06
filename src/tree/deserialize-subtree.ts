import { Tree } from './tree';
import { SerializedSubtree } from './types';

/**
 * NOTE: for now assume always root
 * TODO: cleanup the root (/) logic
 */

export function deserializeSubtree(
    serializedSubtree: SerializedSubtree,
    tree: Tree
) {
    for (const node of serializedSubtree) {
        const path =
            node.path === '/'
                ? node.name
                : `${node.path.substring(1)}/${node.name}`;
        tree.addNode(path);
    }
    return tree;
}
