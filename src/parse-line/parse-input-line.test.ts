import { CommandType } from "./command"
import { parseInputLine } from "./parse-input-line"

/**
 * TODO: whitespace within an arguement, e.g. CREATE "my directory with whitespace" - clarification on requirements needed
 */

describe("parseInputLines", () => {
    it("parses CREATE - success", () => {
        expect(parseInputLine("CREATE fruits")).toEqual({
            type: CommandType.CREATE,
            target: "fruits"
        })
    })

    it("parses CREATE - invalid format 1", () => {
        expect(() => parseInputLine("CREATE fruits and vegetables")).toThrowErrorMatchingInlineSnapshot(`"Invalid CREATE command format. Correct format: CREATE <target>. Recieved: CREATE fruits and vegetables"`);
    })

    it("parses CREATE - invalid format 2", () => {
        expect(() => parseInputLine("CREATE")).toThrowErrorMatchingInlineSnapshot(`"Invalid CREATE command format. Correct format: CREATE <target>. Recieved: CREATE "`);
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

    it("parses MOVE - invalid format 3", () => {
        expect(() => parseInputLine("MOVE")).toThrowErrorMatchingInlineSnapshot(`"Invalid MOVE command format. Correct format: MOVE <source> <target>. Recieved: MOVE "`);
    })

    it("parses LIST - success", () => {
        expect(parseInputLine("LIST")).toEqual({
            type: CommandType.LIST,
        })
    })

    it("parses LIST - invalid format 2", () => {
        expect(() => parseInputLine("LIST grains/squash")).toThrowErrorMatchingInlineSnapshot(`"Invalid LIST command format. Correct format: LIST. Recieved: LIST grains/squash"`);
    })

    it("parses invalid command 1", () => {
        expect(() => parseInputLine("list")).toThrowErrorMatchingInlineSnapshot(`"Unknown command: list. Supported commands: [CREATE, LIST, MOVE, DELETE, EXIT]"`);
    })

    it("parses invalid command 2", () => {
        expect(() => parseInputLine("listlist")).toThrowErrorMatchingInlineSnapshot(`"Unknown command: listlist. Supported commands: [CREATE, LIST, MOVE, DELETE, EXIT]"`);
    })

    it("ignores extra whitespace", () => {
        expect(parseInputLine("   MOVE   grains/squash     vegetables    ")).toEqual({
            type: CommandType.MOVE,
            source: "grains/squash",
            target: "vegetables"
        })
    })
})
