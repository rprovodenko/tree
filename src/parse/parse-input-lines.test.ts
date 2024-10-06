import { CommandType } from "./command"
import { parseInputLine } from "./parse-input-line"

describe("parseInputLines", () => {
    it("parses CREATE - success", () => {
        expect(parseInputLine("CREATE fruits")).toEqual({
            type: CommandType.CREATE,
            target: "fruits"
        })
    })

    it("parses CREATE - invalid format", () => {
        expect(() => parseInputLine("CREATE fruits and vegetables")).toThrowErrorMatchingInlineSnapshot(`"Invalid CREATE command format. Correct format: CREATE <target>. Recieved: CREATE fruits and vegetables"`);
    })


    it("parses MOVE - success", () => {
        expect(parseInputLine("MOVE grains/squash vegetables")).toEqual({
            type: CommandType.MOVE,
            source: "grains/squash",
            target: "vegetables"
        })
    })


    it("parses MOVE - invalid format 1", () => {
        expect(() => parseInputLine("MOVE grains/squash")).toThrowErrorMatchingInlineSnapshot(`"Invalid MOVE command format. Correct format: MOVE <source> <target>. Recieved: MOVE grains/squash"`);
    })

    it("parses MOVE - invalid format 2", () => {
        expect(() => parseInputLine("MOVE grains/squash and here")).toThrowErrorMatchingInlineSnapshot(`"Invalid MOVE command format. Correct format: MOVE <source> <target>. Recieved: MOVE grains/squash and here"`);
    })
})
