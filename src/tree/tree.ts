import {Node} from "./node";

function parsePath(path: string) {
    return path.split("/");
}

// Do not initialize via constructor
export class Tree {
    private root = new Node("root", true);

    public addNode(pathString: string) {
        const path = parsePath(pathString);
        let currentNode = this.root;
        for (const nodeName of path) {
            if (currentNode.hasChild(nodeName)) {
                currentNode = currentNode.getChild(nodeName)
                continue;
            }
            const newNode = new Node(nodeName);
            currentNode.addChild(newNode);
        }
        // parse path
        // make sure that every one of these exist
    }

    public removeNode(pathString: string) {
        // parse path
        // find the last element in path
        // remove it

        const path = parsePath(pathString);
        const nodeToRemove = path.pop();
        const parent = this.getNode(path.join("/"))
        return parent.removeChild(nodeToRemove);
    }

    public moveNode(fromPath: string, toPath: string) {
        // parse path
        // find the last element in fromPath
        // find the toPath
        // detach from first, attach to second

        const newParent = this.getNode(toPath);
        if (!newParent) {
            throw new Error(`nowhere to move...`)
        }
        const removedNode = this.removeNode(fromPath);
        newParent.addChild(removedNode);
    }

    public getNode(pathString: string) {
        const path = parsePath(pathString);
        let currentParent = this.root;
        for (const parent of path) {
            if (currentParent.has(parent)) {
                currentParent = currentParent.get(parent)
                continue;
            }
            throw new Error(`Path does not exist:.....`)
        }
        return currentParent;
    }
}


export function initializeTree() {

    return new Tree();

}
