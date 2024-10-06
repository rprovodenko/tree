/**
 * TODO:
 * - add node at path
 * - remove node at path
 * - move node from path1 to path2
 * - get node at path
 */

describe("tree navigator", () => {
    it("finds node at path", () => {
        // const treeNavigator = initializeTreeNavigator(tree)
    })

    it("adds node at path", () => {
        const tree = initalizeTree();
        tree.addNode("asa/sad", "dasdas")
        // expect
    })

    it("removes node at path", () => {
        const tree = initalizeTree();
        tree.addNode("asa/sad", "dasdas")
        tree.removeNode("asa/sad/dasdas")
        // expect

    })

    it("moves node at path1 to path2", () => {
        const tree = initalizeTree();
        tree.addNode("asa/sad", "dasdas")
        tree.addNode("adsads", "sadsadas")
        tree.moveNode("asa/sad/dasdas", "adsads/sadsadas")
    })

    it("gets node at path", () => {

        const tree = initalizeTree();
        tree.addNode("adsads", "sadsadas")
        tree.deleteNode("adsads/sadsadas")
    })
    
})
