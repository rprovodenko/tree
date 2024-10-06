import { formatSubtree } from "./format-subtree";
import {Node} from "./node";


// TODO: remove all the assertions
type ParsedPath = [string, ...string[]];

function parsePath(path: string): ParsedPath {
    const cleanedPath = path.replace(/\s+/g, ' ').trim();
    const splitPath = cleanedPath.split("/");

    if (splitPath[0].length === 0) {
        throw new Error("Invalid empty path!")
    }
    return <ParsedPath>splitPath;
}

// Do not initialize via constructor
export class Tree {
    private root = new Node("root", true);

    public addNode(pathString: string) {
        try {
            const path = parsePath(pathString);
            let currentNode = this.root;
            for (const nodeName of path) {
                if (currentNode.hasChild(nodeName)) {
                    currentNode = currentNode.getChild(nodeName)
                    continue;
                }
                const newNode = new Node(nodeName);
                currentNode.addChild(newNode);
                currentNode = newNode;
            }
        } catch (e) {
            if (e instanceof Error) {
                throw new Error(`Cannot add. ${e.message}`)
            }
            throw e
        }
    }

    public removeNode(pathString: string) {
        try {
            const path = parsePath(pathString);
            const nodeToRemove = <string>path.pop();
            const parent = path.length > 0 ? this.getNode(path.join("/")) : this.root;
            return parent.removeChild(nodeToRemove);
        } catch (e) {
            if (e instanceof Error) {
                throw new Error(`Cannot delete ${pathString}. ${e.message}`)
            }
            throw e
        }
    }

    public moveNode(fromPath: string, toPath: string) {
        try {
            const newParent = this.getNode(toPath);
            if (!newParent) {
                throw new Error(`nowhere to move...`)
            }
            const removedNode = this.removeNode(fromPath);
            newParent.addChild(removedNode);
        } catch (e) {
            if (e instanceof Error) {
                throw new Error(`Cannot move from ${fromPath} to ${toPath}. ${e.message}`)
            }
            throw e
        }
    }

    public getNode(pathString: string) {
        if (pathString === "/") {
            return this.root
        }
        const path = parsePath(pathString);
        let currentParent = this.root;
        for (const parent of path) {
            if (currentParent.hasChild(parent)) {
                currentParent = currentParent.getChild(parent)
                continue;
            }
            throw new Error(`Cannot find: In path ${pathString} <--- "${parent}" does not exist`)
        }
        return currentParent;
    }

    public list() {
        return formatSubtree(this.root);
    }
    
}


export function initializeTree() {
    return new Tree();
}
