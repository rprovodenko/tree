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
        "name": "fruits",
        "root": false,
      },
      "vegetables" => Node {
        "childNodes": Map {},
        "name": "vegetables",
        "root": false,
      },
    },
    "name": "root",
    "root": true,
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
            "name": "grains",
            "root": false,
          },
          "fruits" => Node {
            "childNodes": Map {},
            "name": "fruits",
            "root": false,
          },
          "vegetables" => Node {
            "childNodes": Map {
              "squash" => Node {
                "childNodes": Map {},
                "name": "squash",
                "root": false,
              },
            },
            "name": "vegetables",
            "root": false,
          },
        },
        "name": "foods",
        "root": false,
      },
    },
    "name": "root",
    "root": true,
  },
}
`);
    })
})
