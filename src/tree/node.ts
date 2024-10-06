export class Node {
    private childNodes = new Map<string, Node>();
    constructor(private name: string, private root = false) {}

    public getName() {
        return this.name;
    }

    public getIsRoot() {
        return this.root;
    }

    public addChild(child: Node) {
        if (this.childNodes.has(child.getName())) {
            throw new Error('Child already exists!');
        }
        this.childNodes.set(child.getName(), child);
    }

    public removeChild(childName: string): Node {
        if (!this.childNodes.has(childName)) {
            throw new Error(`${childName} does not exist`);
        }
        const child = this.childNodes.get(childName);
        this.childNodes.delete(childName);
        return <Node>child;
    }

    public hasChild(childName: string) {
        return this.childNodes.has(childName);
    }

    public getChild(childName: string): Node {
        if (!this.hasChild(childName)) {
            throw new Error('Child does not exist!');
        }
        return <Node>this.childNodes.get(childName);
    }

    public getChildren(): Node[] {
        return [...this.childNodes.values()];
    }
}
