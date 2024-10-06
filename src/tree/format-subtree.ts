import { Node } from './node';
/**
 * NOTE: for now assume always root
 */
export function formatSubtree(node: Node) {
    let output = '';

    const nodes = node.getChildren().map((node) => ({ node, space: 0 }));
    while (nodes.length > 0) {
        const { node, space } = nodes.shift()!;
        output += ' '.repeat(space) + node.getName() + '\n';
        const children = node
            .getChildren()
            .map((n) => ({ node: n, space: space + 1 }));
        nodes.unshift(...children);
    }

    return output.length === 0 ? '\n' : output;
}
