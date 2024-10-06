import { applyCommandToTree } from "./multiline-feed";
import { CommandType } from "./parse-line/command";
import { parseInputLine } from "./parse-line/parse-input-line";
import { loadStateFrom } from "./state-persistance/load-state-from";
import { saveStateTo } from "./state-persistance/save-state-to";
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
    const args = getArgs();
    const loadedState = args.loadStateFrom ? await loadStateFrom(args.loadStateFrom) : undefined

    const tree = await initializeTree(loadedState);
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
    if (args.saveStateTo) {
        const currentState = tree.serialize();
        await saveStateTo(currentState, args.saveStateTo);
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
interface Parameters {
    loadStateFrom?: string;
    saveStateTo?: string;
}

function getArgs() {
    const args = process.argv.slice(2);
    const parsedArgs: Parameters = {}

    args.forEach(arg => {
        const [key, value] = arg.split('=');
        if (key === "--load-state") {
            parsedArgs["loadStateFrom"] = value;
            return;
        }
        if (key === "--save-state") {
            parsedArgs["saveStateTo"] = value;
            return;
        }
        throw new Error(`Unknown argument provided: ${key}. Correct usage: npm start [--load-state=/saved/state/location] [--save-state=/where/i/want/to/save/state]`)
    });
    return parsedArgs;
}

start().catch(e => {
    console.error(e);
    process.exit(1);
})
