import { initializeTree } from "./tree";
/**
 * TODO:
 * - extra spaces, foward slashes at edges ?
 * - error cases
 * - moving where the same name exists
 * - move to root
 * - moving error cases
 */

describe("tree navigator", () => {
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

    it("finds node at path", () => {
        const tree = initializeTree();
        tree.addNode("child1a/child2/child3")
        tree.addNode("child1b/child2/child3")
        tree.addNode("child1c/child2/child3")
        expect(tree.getNode("child1b/child2")).toMatchInlineSnapshot(`
Node {
  "childNodes": Map {
    "child3" => Node {
      "childNodes": Map {},
      "hidden": false,
      "name": "child3",
    },
  },
  "hidden": false,
  "name": "child2",
}
`);
        expect(tree.getNode("child1c")).toMatchInlineSnapshot(`
Node {
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
}
`);
    })


    it("moves node at path1 to path2", () => {
        const tree = initializeTree();
        tree.addNode("child1a/child2a/child3")
        tree.addNode("child1b/child2b/child3")
        tree.moveNode("child1b/child2b/child3", "child1a/child2a/child3")
        expect(tree).toMatchInlineSnapshot(`
Tree {
  "root": Node {
    "childNodes": Map {
      "child1a" => Node {
        "childNodes": Map {
          "child2a" => Node {
            "childNodes": Map {
              "child3" => Node {
                "childNodes": Map {
                  "child3" => Node {
                    "childNodes": Map {},
                    "hidden": false,
                    "name": "child3",
                  },
                },
                "hidden": false,
                "name": "child3",
              },
            },
            "hidden": false,
            "name": "child2a",
          },
        },
        "hidden": false,
        "name": "child1a",
      },
      "child1b" => Node {
        "childNodes": Map {
          "child2b" => Node {
            "childNodes": Map {},
            "hidden": false,
            "name": "child2b",
          },
        },
        "hidden": false,
        "name": "child1b",
      },
    },
    "hidden": true,
    "name": "root",
  },
}
`);
    })


    it("moves nested dirs", () => {
        const tree = initializeTree();
        tree.addNode("child1a/child2a/child3")
        tree.addNode("child1b/child2b/child3")
        tree.moveNode("child1b/child2b", "child1a/child2a")
        expect(tree).toMatchInlineSnapshot(`
Tree {
  "root": Node {
    "childNodes": Map {
      "child1a" => Node {
        "childNodes": Map {
          "child2a" => Node {
            "childNodes": Map {
              "child3" => Node {
                "childNodes": Map {},
                "hidden": false,
                "name": "child3",
              },
              "child2b" => Node {
                "childNodes": Map {
                  "child3" => Node {
                    "childNodes": Map {},
                    "hidden": false,
                    "name": "child3",
                  },
                },
                "hidden": false,
                "name": "child2b",
              },
            },
            "hidden": false,
            "name": "child2a",
          },
        },
        "hidden": false,
        "name": "child1a",
      },
      "child1b" => Node {
        "childNodes": Map {},
        "hidden": false,
        "name": "child1b",
      },
    },
    "hidden": true,
    "name": "root",
  },
}
`);
    })


    it("moves nested dirs - 2", () => {
        const tree = initializeTree();
        tree.addNode("child1a/child2a/child3")
        tree.addNode("child1b/child2b/child3")
        tree.moveNode("child1b", "child1a/child2a/child3")
        expect(tree).toMatchInlineSnapshot(`
Tree {
  "root": Node {
    "childNodes": Map {
      "child1a" => Node {
        "childNodes": Map {
          "child2a" => Node {
            "childNodes": Map {
              "child3" => Node {
                "childNodes": Map {
                  "child1b" => Node {
                    "childNodes": Map {
                      "child2b" => Node {
                        "childNodes": Map {
                          "child3" => Node {
                            "childNodes": Map {},
                            "hidden": false,
                            "name": "child3",
                          },
                        },
                        "hidden": false,
                        "name": "child2b",
                      },
                    },
                    "hidden": false,
                    "name": "child1b",
                  },
                },
                "hidden": false,
                "name": "child3",
              },
            },
            "hidden": false,
            "name": "child2a",
          },
        },
        "hidden": false,
        "name": "child1a",
      },
    },
    "hidden": true,
    "name": "root",
  },
}
`);
    })
})
