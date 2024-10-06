import {join} from "path";
import { loadStateFrom } from "./load-state-from";


describe("loadStateFrom", () => {
    it("reads file and returns state object", async () => {
        const state = await loadStateFrom(join(__dirname, "./test-fixtures/test-state.json"))
        expect(state).toMatchInlineSnapshot(`
[
  {
    "name": "child1a",
    "path": "/",
  },
]
`);
    })
})
