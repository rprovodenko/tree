import { applyCommandToTree } from "./multiline-feed";
import { CommandType } from "./parse-line/command";
import { parseInputLine } from "./parse-line/parse-input-line";
import { initializeTree } from "./tree/tree";


async function readFromStdin(): Promise<string> {
    process.stdin.resume();
    return await new Promise((res, rej) => {
        let input = "";
        process.stdin.on("data", data => {
            input += data.toString();
            if (input.includes("\n")) {
                process.stdin.pause();
                res(input.split("\n")[0])
            }
        })
    })

}

async function start() {
    const tree = initializeTree();
    let exit = false;
    while (!exit) {
        const command = await pollStdIn();
        if (command.type === CommandType.EXIT) {
            exit = true;
            continue;
        }
        const output = applyCommandToTree(tree, command);
        console.log(output);
    }
}

async function pollStdIn() {
    const inputLine = await readFromStdin();
    return parseInputLine(inputLine);
}

start().catch(e => {
    console.error(e);
    process.exit(1);
})
