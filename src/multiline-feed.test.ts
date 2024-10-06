import { multilineFeed } from "./multiline-feed";
import { initializeTree } from "./tree/tree"

describe("Multiline integration", () => {
    it("allows taking commands and feeding into tree - 1", () => {
        const tree = initializeTree();
        multilineFeed(tree, `CREATE fruits
CREATE vegetables`)
        expect(tree.list()).toMatchInlineSnapshot(`
"fruits
vegetables
"
`);
    })


    it("allows taking commands and feeding into tree - 2", () => {
        const tree = initializeTree();
        multilineFeed(tree, `CREATE fruits
CREATE vegetables
CREATE grains
CREATE fruits/apples
CREATE fruits/apples/fuji`)
        expect(tree.list()).toMatchInlineSnapshot(`
"fruits
 apples
  fuji
vegetables
grains
"
`);
    })

    it("allows taking commands and feeding into tree - 3", () => {
        const tree = initializeTree();
        multilineFeed(tree, `CREATE fruits
CREATE vegetables
CREATE grains
CREATE fruits/apples
CREATE fruits/apples/fuji
CREATE grains/squash
MOVE grains/squash vegetables
CREATE foods
MOVE grains foods
MOVE fruits foods
MOVE vegetables foods
LIST`)
        expect(tree.list()).toMatchInlineSnapshot(`
"foods
 grains
 fruits
  apples
   fuji
 vegetables
  squash
"
`);
    })

    it("allows taking commands and feeding into tree - 4", () => {
        const tree = initializeTree();
        multilineFeed(tree, `CREATE fruits
CREATE vegetables
CREATE grains
CREATE fruits/apples
CREATE fruits/apples/fuji
CREATE grains/squash
MOVE grains/squash vegetables
CREATE foods
MOVE grains foods
MOVE fruits foods
MOVE vegetables foods
DELETE foods/fruits/apples`)
        expect(tree.list()).toMatchInlineSnapshot(`
"foods
 grains
 fruits
 vegetables
  squash
"
`);
    })
})
