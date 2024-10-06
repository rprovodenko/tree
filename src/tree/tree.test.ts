import { initializeTree } from "./tree";
/**
 * TODO:
 * - extra spaces, foward slashes at edges ?
 */

describe("tree navigator", () => {
    it("finds node at path", () => {
        // const treeNavigator = initializeTreeNavigator(tree)
    })

    it("adds node at path - root level", () => {
        const tree = initializeTree();
        tree.addNode("child1")
        expect(tree).toMatchInlineSnapshot(`
Tree {
  "root": Node {
    "childNodes": Map {
      "child1" => Node {
        "childNodes": Map {},
        "hidden": false,
        "name": "child1",
      },
    },
    "hidden": true,
    "name": "root",
  },
}
`);
    })


    it("adds node at path - a few levels down", () => {
        const tree = initializeTree();
        tree.addNode("child1/child2/child3")
        expect(tree).toMatchInlineSnapshot(`
Tree {
  "root": Node {
    "childNodes": Map {
      "child1" => Node {
        "childNodes": Map {
          "child2" => Node {
            "childNodes": Map {
              "child3" => Node {
                "childNodes": Map {},
                "hidden": false,
                "name": "child3",
              },
            },
            "hidden": false,
            "name": "child2",
          },
        },
        "hidden": false,
        "name": "child1",
      },
    },
    "hidden": true,
    "name": "root",
  },
}
`);
    })


    it("adds node at path - complex case", () => {
        const tree = initializeTree();
        tree.addNode("child1a/child2/child3")
        tree.addNode("child1b/child2/child3")
        tree.addNode("child1c/child2/child3")
        tree.addNode("child1d/child2/child3")
        expect(tree).toMatchInlineSnapshot(`
Tree {
  "root": Node {
    "childNodes": Map {
      "child1a" => Node {
        "childNodes": Map {
          "child2" => Node {
            "childNodes": Map {
              "child3" => Node {
                "childNodes": Map {},
                "hidden": false,
                "name": "child3",
              },
            },
            "hidden": false,
            "name": "child2",
          },
        },
        "hidden": false,
        "name": "child1a",
      },
      "child1b" => Node {
        "childNodes": Map {
          "child2" => Node {
            "childNodes": Map {
              "child3" => Node {
                "childNodes": Map {},
                "hidden": false,
                "name": "child3",
              },
            },
            "hidden": false,
            "name": "child2",
          },
        },
        "hidden": false,
        "name": "child1b",
      },
      "child1c" => Node {
        "childNodes": Map {
          "child2" => Node {
            "childNodes": Map {
              "child3" => Node {
                "childNodes": Map {},
                "hidden": false,
                "name": "child3",
              },
            },
            "hidden": false,
            "name": "child2",
          },
        },
        "hidden": false,
        "name": "child1c",
      },
      "child1d" => Node {
        "childNodes": Map {
          "child2" => Node {
            "childNodes": Map {
              "child3" => Node {
                "childNodes": Map {},
                "hidden": false,
                "name": "child3",
              },
            },
            "hidden": false,
            "name": "child2",
          },
        },
        "hidden": false,
        "name": "child1d",
      },
    },
    "hidden": true,
    "name": "root",
  },
}
`);
    })


    it("removes node at path - nesting", () => {
        const tree = initializeTree();
        tree.addNode("child1/child2/child3")
        tree.removeNode("child1/child2")
        expect(tree).toMatchInlineSnapshot(`
Tree {
  "root": Node {
    "childNodes": Map {
      "child1" => Node {
        "childNodes": Map {},
        "hidden": false,
        "name": "child1",
      },
    },
    "hidden": true,
    "name": "root",
  },
}
`);
    })


    it("removes node at path - root", () => {
        const tree = initializeTree();
        tree.addNode("child1/child2/child3")
        tree.removeNode("child1")
        expect(tree).toMatchInlineSnapshot(`
Tree {
  "root": Node {
    "childNodes": Map {},
    "hidden": true,
    "name": "root",
  },
}
`);
    })


    it("removes node at path - last element in nesting", () => {
        const tree = initializeTree();
        tree.addNode("child1/child2/child3")
        tree.removeNode("child1/child2/child3")
        expect(tree).toMatchInlineSnapshot(`
Tree {
  "root": Node {
    "childNodes": Map {
      "child1" => Node {
        "childNodes": Map {
          "child2" => Node {
            "childNodes": Map {},
            "hidden": false,
            "name": "child2",
          },
        },
        "hidden": false,
        "name": "child1",
      },
    },
    "hidden": true,
    "name": "root",
  },
}
`);
    })


    it("removes node at path - complex case", () => {
        const tree = initializeTree();
        tree.addNode("child1a/child2/child3")
        tree.addNode("child1b/child2/child3")
        tree.addNode("child1c/child2/child3")
        tree.removeNode("child1a/child2")
        tree.removeNode("child1c/child2/child3")
        expect(tree).toMatchInlineSnapshot(`
Tree {
  "root": Node {
    "childNodes": Map {
      "child1a" => Node {
        "childNodes": Map {},
        "hidden": false,
        "name": "child1a",
      },
      "child1b" => Node {
        "childNodes": Map {
          "child2" => Node {
            "childNodes": Map {
              "child3" => Node {
                "childNodes": Map {},
                "hidden": false,
                "name": "child3",
              },
            },
            "hidden": false,
            "name": "child2",
          },
        },
        "hidden": false,
        "name": "child1b",
      },
      "child1c" => Node {
        "childNodes": Map {
          "child2" => Node {
            "childNodes": Map {},
            "hidden": false,
            "name": "child2",
          },
        },
        "hidden": false,
        "name": "child1c",
      },
    },
    "hidden": true,
    "name": "root",
  },
}
`);
    })

    // it("moves node at path1 to path2", () => {
    //     const tree = initializeTree();
    //     tree.addNode("asa/sad", "dasdas")
    //     tree.addNode("adsads", "sadsadas")
    //     tree.moveNode("asa/sad/dasdas", "adsads/sadsadas")
    // })

    // it("gets node at path", () => {

    //     const tree = initializeTree();
    //     tree.addNode("adsads", "sadsadas")
    //     tree.deleteNode("adsads/sadsadas")
    // })
    
})
