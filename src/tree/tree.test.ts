import { initializeTree } from "./tree";
/**
 * TODO:
 * - extra spaces, foward slashes at edges ?
 * - error cases
 * - moving where the same name exists
 * - move to root
 * - moving error cases
 * - format subtree at root level
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
        "name": "child1",
        "root": false,
      },
    },
    "name": "root",
    "root": true,
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
                "name": "child3",
                "root": false,
              },
            },
            "name": "child2",
            "root": false,
          },
        },
        "name": "child1",
        "root": false,
      },
    },
    "name": "root",
    "root": true,
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
                "name": "child3",
                "root": false,
              },
            },
            "name": "child2",
            "root": false,
          },
        },
        "name": "child1a",
        "root": false,
      },
      "child1b" => Node {
        "childNodes": Map {
          "child2" => Node {
            "childNodes": Map {
              "child3" => Node {
                "childNodes": Map {},
                "name": "child3",
                "root": false,
              },
            },
            "name": "child2",
            "root": false,
          },
        },
        "name": "child1b",
        "root": false,
      },
      "child1c" => Node {
        "childNodes": Map {
          "child2" => Node {
            "childNodes": Map {
              "child3" => Node {
                "childNodes": Map {},
                "name": "child3",
                "root": false,
              },
            },
            "name": "child2",
            "root": false,
          },
        },
        "name": "child1c",
        "root": false,
      },
      "child1d" => Node {
        "childNodes": Map {
          "child2" => Node {
            "childNodes": Map {
              "child3" => Node {
                "childNodes": Map {},
                "name": "child3",
                "root": false,
              },
            },
            "name": "child2",
            "root": false,
          },
        },
        "name": "child1d",
        "root": false,
      },
    },
    "name": "root",
    "root": true,
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
        "name": "child1",
        "root": false,
      },
    },
    "name": "root",
    "root": true,
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
    "name": "root",
    "root": true,
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
            "name": "child2",
            "root": false,
          },
        },
        "name": "child1",
        "root": false,
      },
    },
    "name": "root",
    "root": true,
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
        "name": "child1a",
        "root": false,
      },
      "child1b" => Node {
        "childNodes": Map {
          "child2" => Node {
            "childNodes": Map {
              "child3" => Node {
                "childNodes": Map {},
                "name": "child3",
                "root": false,
              },
            },
            "name": "child2",
            "root": false,
          },
        },
        "name": "child1b",
        "root": false,
      },
      "child1c" => Node {
        "childNodes": Map {
          "child2" => Node {
            "childNodes": Map {},
            "name": "child2",
            "root": false,
          },
        },
        "name": "child1c",
        "root": false,
      },
    },
    "name": "root",
    "root": true,
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
      "name": "child3",
      "root": false,
    },
  },
  "name": "child2",
  "root": false,
}
`);
        expect(tree.getNode("child1c")).toMatchInlineSnapshot(`
Node {
  "childNodes": Map {
    "child2" => Node {
      "childNodes": Map {
        "child3" => Node {
          "childNodes": Map {},
          "name": "child3",
          "root": false,
        },
      },
      "name": "child2",
      "root": false,
    },
  },
  "name": "child1c",
  "root": false,
}
`);
    })


    it("finds node at root", () => {
        const tree = initializeTree();
        tree.addNode("child1a/child2/child3")
        tree.addNode("child1b/child2/child3")
        expect(tree.getNode("/")).toMatchInlineSnapshot(`
Node {
  "childNodes": Map {
    "child1a" => Node {
      "childNodes": Map {
        "child2" => Node {
          "childNodes": Map {
            "child3" => Node {
              "childNodes": Map {},
              "name": "child3",
              "root": false,
            },
          },
          "name": "child2",
          "root": false,
        },
      },
      "name": "child1a",
      "root": false,
    },
    "child1b" => Node {
      "childNodes": Map {
        "child2" => Node {
          "childNodes": Map {
            "child3" => Node {
              "childNodes": Map {},
              "name": "child3",
              "root": false,
            },
          },
          "name": "child2",
          "root": false,
        },
      },
      "name": "child1b",
      "root": false,
    },
  },
  "name": "root",
  "root": true,
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
                    "name": "child3",
                    "root": false,
                  },
                },
                "name": "child3",
                "root": false,
              },
            },
            "name": "child2a",
            "root": false,
          },
        },
        "name": "child1a",
        "root": false,
      },
      "child1b" => Node {
        "childNodes": Map {
          "child2b" => Node {
            "childNodes": Map {},
            "name": "child2b",
            "root": false,
          },
        },
        "name": "child1b",
        "root": false,
      },
    },
    "name": "root",
    "root": true,
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
                "name": "child3",
                "root": false,
              },
              "child2b" => Node {
                "childNodes": Map {
                  "child3" => Node {
                    "childNodes": Map {},
                    "name": "child3",
                    "root": false,
                  },
                },
                "name": "child2b",
                "root": false,
              },
            },
            "name": "child2a",
            "root": false,
          },
        },
        "name": "child1a",
        "root": false,
      },
      "child1b" => Node {
        "childNodes": Map {},
        "name": "child1b",
        "root": false,
      },
    },
    "name": "root",
    "root": true,
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
                            "name": "child3",
                            "root": false,
                          },
                        },
                        "name": "child2b",
                        "root": false,
                      },
                    },
                    "name": "child1b",
                    "root": false,
                  },
                },
                "name": "child3",
                "root": false,
              },
            },
            "name": "child2a",
            "root": false,
          },
        },
        "name": "child1a",
        "root": false,
      },
    },
    "name": "root",
    "root": true,
  },
}
`);
    })


    it("should list - empty root", () => {
        const tree = initializeTree();
        expect(tree.list()).toMatchInlineSnapshot(`
"
"
`);
    })


    it("should list - one element", () => {
        const tree = initializeTree();
        tree.addNode("child1")
        expect(tree.list()).toMatchInlineSnapshot(`
"child1
"
`);
    })

    it("should list - two elements", () => {
        const tree = initializeTree();
        tree.addNode("child1")
        tree.addNode("child2")
        expect(tree.list()).toMatchInlineSnapshot(`
"child1
child2
"
`);
    })
    it("should list - nested", () => {
        const tree = initializeTree();
        tree.addNode("child1/child2")
        expect(tree.list()).toMatchInlineSnapshot(`
"child1
 child2
"
`);
    })

    
    it("should list - complex", () => {
        const tree = initializeTree();
        tree.addNode("child1a/child2a/child3a");
        tree.addNode("child1a/child2a/child3a1");
        tree.addNode("child1a/child2a/child3a2");
        tree.addNode("child1a/child2a/child3a2/child4a");
        tree.addNode("child1b/child2b");
        expect(tree.list()).toMatchInlineSnapshot(`
"child1a
 child2a
  child3a
  child3a1
  child3a2
   child4a
child1b
 child2b
"
`);
    })
})
