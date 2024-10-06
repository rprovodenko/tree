import { deserializeSubtree } from './deserialize-subtree';
import { formatSubtree } from './format-subtree';
import { Node } from './node';
import { serlizeSubtree } from './serialize-subtree';
import { SerializedSubtree } from './types';

// TODO: remove all the assertions, refactor typings
type ParsedPath = [string, ...string[]];

function parsePath(path: string): ParsedPath {
    const cleanedPath = path.replace(/\s+/g, ' ').trim();
    const splitPath = cleanedPath.split('/');

    if (splitPath[0].length === 0) {
        throw new Error('Invalid empty path!');
    }
    return <ParsedPath>splitPath;
}

// is path1 is a parent of path2
function isAParent(path1: string, path2: string) {
    if (path2 === "/") {
        return false;
    }
    if (path1 === "/") {
        return true;
    }
    const parts1 = parsePath(path1);
    const parts2 = parsePath(path2);
    if (parts1.length === parts2.length) {
        return false;
    }
    for (let i = 0; i < parts1.length; i++) {
        if (parts1[i] === parts2[i]) {
            continue;
        }
        return false;
    }
    return true;
}


// Do not initialize via constructor
export class Tree {
    private root = new Node('root', true);

    public addNode(pathString: string) {
        try {
            const path = parsePath(pathString);
            let currentNode = this.root;
            for (const nodeName of path) {
                if (currentNode.hasChild(nodeName)) {
                    currentNode = currentNode.getChild(nodeName);
                    continue;
                }
                const newNode = new Node(nodeName);
                currentNode.addChild(newNode);
                currentNode = newNode;
            }
        } catch (e) {
            console.log(pathString);
            if (e instanceof Error) {
                throw new Error(`Cannot add. ${e.message}`);
            }
            throw e;
        }
    }

    public removeNode(pathString: string) {
        try {
            const path = parsePath(pathString);
            const nodeToRemove = <string>path.pop();
            const parent =
                path.length > 0 ? this.getNode(path.join('/')) : this.root;
            return parent.removeChild(nodeToRemove);
        } catch (e) {
            if (e instanceof Error) {
                throw new Error(`Cannot delete ${pathString}. ${e.message}`);
            }
            throw e;
        }
    }

    public moveNode(fromPath: string, toPath: string) {
        try {
            const isFromParentOfTo = isAParent(fromPath, toPath);
            if (isFromParentOfTo) {
                throw new Error(`Cannot move parent to child.`)
            }

            const newParent = this.getNode(toPath);
            if (!newParent) {
                throw new Error(`nowhere to move...`);
            }
            const toBeRemovedNode = this.getNode(fromPath);
            newParent.addChild(toBeRemovedNode);
            this.removeNode(fromPath);
        } catch (e) {
            if (e instanceof Error) {
                throw new Error(
                    `Cannot move from ${fromPath} to ${toPath}. ${e.message}`
                );
            }
            throw e;
        }
    }

    public getNode(pathString: string) {
        if (pathString === '/') {
            return this.root;
        }
        const path = parsePath(pathString);
        let currentParent = this.root;
        for (const parent of path) {
            if (currentParent.hasChild(parent)) {
                currentParent = currentParent.getChild(parent);
                continue;
            }
            throw new Error(
                `Cannot find: In path ${pathString} <--- "${parent}" does not exist`
            );
        }
        return currentParent;
    }

    public list() {
        return formatSubtree(this.root);
    }

    public serialize() {
        return serlizeSubtree(this.root);
    }
}

export function initializeTree(serializedSubtree?: SerializedSubtree) {
    const tree = new Tree();
    if (serializedSubtree) {
        deserializeSubtree(serializedSubtree, tree);
    }
    return tree;
}
