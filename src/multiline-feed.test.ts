import { multilineFeed } from "./multiline-feed";
import { initializeTree } from "./tree/tree"

describe("Multiline integration", () => {
    it("allows taking commands and feeding into tree - 1", () => {
        const tree = initializeTree();
        multilineFeed(tree, `CREATE fruits
CREATE vegetables`)
        expect(tree).toMatchInlineSnapshot(`
Tree {
  "root": Node {
    "childNodes": Map {
      "fruits" => Node {
        "childNodes": Map {},
        "hidden": false,
        "name": "fruits",
      },
      "vegetables" => Node {
        "childNodes": Map {},
        "hidden": false,
        "name": "vegetables",
      },
    },
    "hidden": true,
    "name": "root",
  },
}
`);
    })


    it("allows taking commands and feeding into tree - 2", () => {
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
        expect(tree).toMatchInlineSnapshot(`
Tree {
  "root": Node {
    "childNodes": Map {
      "foods" => Node {
        "childNodes": Map {
          "grains" => Node {
            "childNodes": Map {},
            "hidden": false,
            "name": "grains",
          },
          "fruits" => Node {
            "childNodes": Map {},
            "hidden": false,
            "name": "fruits",
          },
          "vegetables" => Node {
            "childNodes": Map {
              "squash" => Node {
                "childNodes": Map {},
                "hidden": false,
                "name": "squash",
              },
            },
            "hidden": false,
            "name": "vegetables",
          },
        },
        "hidden": false,
        "name": "foods",
      },
    },
    "hidden": true,
    "name": "root",
  },
}
`);
    })
})
