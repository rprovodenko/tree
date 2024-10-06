import { applyCommandToTree } from "./multiline-feed";
import { CommandType } from "./parse-line/command";
import { parseInputLine } from "./parse-line/parse-input-line";
import { initializeTree } from "./tree/tree";

async function readFromStdin(): Promise<string> {
    process.stdin.resume();
    return await new Promise((res, rej) => {
        let input = "";
        const listener = (data: Buffer) => {
            input += data.toString();
            if (input.includes("\n")) {
                process.stdin.pause();
                process.stdin.removeListener("data", listener);
                res(input.split("\n")[0])
            }
        }
        process.stdin.on("data", listener)
    })
}

async function start() {
    const tree = initializeTree();
    let exit = false;
    while (!exit) {
        const command = await pollStdIn();
        // TODO create UNKNOWN_COMMAND instead
        if (command === null) {
            continue;
        }
        if (command.type === CommandType.EXIT) {
            exit = true;
            continue;
        }
        try {
            const output = applyCommandToTree(tree, command);
            if (output) {
                console.log(output);
            }
        } catch (e) {
            if (e instanceof Error) {
                console.error(e.message)
            } else {
                throw e;
            }
        }
    }
}

async function pollStdIn() {
    const inputLine = await readFromStdin();
    try {
        const command = parseInputLine(inputLine);
        return command
    } catch (e) {
        if (e instanceof Error) {
            console.error(e.message)
            return null;
        }
        throw e;
    }
}

start().catch(e => {
    console.error(e);
    process.exit(1);
})
