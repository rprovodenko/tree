import {Node} from "./node";

describe("tree", () => {
    it("should add children", () => {
        const node = new Node("root", true);
        expect(node.hasChild("child")).toBe(false);
        const child = new Node("child")
        node.addChild(child)
        expect(node.hasChild("child")).toBe(true);
    })
    
    it("should remove children", () => {
        const node = new Node("root", true);
        expect(node.hasChild("child")).toBe(false);
        const child = new Node("child")
        node.addChild(child)
        expect(node.hasChild("child")).toBe(true);
        node.removeChild("child");
        expect(node.hasChild("child")).toBe(false);
    })
    

    it("should get child at path", () => {
        const node = new Node("root", true);
        const child = new Node("child")
        node.addChild(child)
        const nodeThree = node.getChild("child");
        expect(nodeThree.getName()).toEqual("child");
    })
})
