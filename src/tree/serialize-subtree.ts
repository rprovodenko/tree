import { Node } from './node';
/**
 * NOTE: for now assume always root
 * TODO: cleanup the root (/) logic
 */
export function serlizeSubtree(node: Node) {
    const nodes = node.getChildren().map((node) => ({ node, path: '/' }));
    const serialized = [];

    while (nodes.length > 0) {
        const { node, path } = nodes.shift()!;
        serialized.push({ name: node.getName(), path });

        const children = node.getChildren().map((n) => ({
            node: n,
            path: `${path === '/' ? '' : path}/${node.getName()}`,
        }));
        nodes.unshift(...children);
    }

    return serialized;
}
